import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ForwardRefRenderFunction,
  MouseEventHandler,
  SVGProps,
} from "react";
import { getStroke } from "perfect-freehand";
import { useEventListener } from "ahooks";
import type { Line, Point, Position } from "~/types";
import useManualHistoryTravel from "~/hooks/useManualHistoryTravel";
import helper from "~/helper";
import useOptionsStore from "~/store/useOptionsStore";
import usePanelStore from "~/store/usePanelStore";
import useSvgAttrs from "~/hooks/useSvgAttrs";

interface Props {
  densities?: number;
  initialLines?: Line[];
}

interface ImperativeHandle {
  onClear: () => void;
  undo: () => void;
  redo: () => void;
  getSvgUrl: () => string;
}

const SvgCanvas: ForwardRefRenderFunction<ImperativeHandle, Props> = (
  props,
  ref
) => {
  const { brushOptions, drawOptions, replayOptions } = useOptionsStore((s) => ({
    brushOptions: s.brush,
    drawOptions: s.draw,
    replayOptions: s.replay,
  }));
  const { setCanRedo, setCanUndo } = usePanelStore((s) => ({
    setCanUndo: s.setCanUndo,
    setCanRedo: s.setCanRedo,
  }));
  const {
    value: lines,
    setState: setLines,
    commit,
    back,
    forward,
    forwardLength,
    backLength,
  } = useManualHistoryTravel<Line[]>([...(props.initialLines ?? [])]);

  const { svgAttrs, bgRectAttrs, getSvg } = useSvgAttrs();

  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const paths = useMemo(
    () =>
      lines?.map(
        (line) =>
          ({
            d:
              line.length === 1
                ? `M${line[0].join(" ")}L${line[0].join(" ")}`
                : `M${line.map((p) => p.join(",")).join("L")}`,
            strokeWidth: drawOptions?.strokeWidth ?? "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: drawOptions?.color ?? "black",
            fill: "none",
          } as SVGProps<SVGPathElement>)
      ),
    [lines, drawOptions?.color, drawOptions?.strokeWidth]
  );
  const brushworkLines = useMemo(
    () =>
      lines?.map((line) => {
        const points = getStroke(line, brushOptions);
        const d = `M${points
          .map((p) => p.map((v) => v.toFixed(2)).join(","))
          .join("L")}Z`;
        return { d };
      }),
    [lines, brushOptions]
  );

  const onMouseDown: MouseEventHandler<SVGSVGElement> = (e) =>
    onDrawStart({ x: e.clientX, y: e.clientY });
  // TODO
  // const onMousemove = throttle(
  //   (e: MouseEvent) =>
  //     onDraw({ x: e.clientX, y: e.clientY }, isDrawing, lines!),
  //   30
  // );
  const onMousemove = (e: MouseEvent) =>
    onDraw({ x: e.clientX, y: e.clientY }, isDrawing, lines!);
  const onMouseup = (_: MouseEvent) => onDrawEnd();

  useImperativeHandle(ref, () => ({
    onClear,
    undo: back,
    redo: forward,
    getSvgUrl: () =>
      helper.svgCode2Url(getSvg(paths, lines, replayOptions, brushworkLines)),
  }));

  useEventListener("mousemove", onMousemove);
  useEventListener("mouseup", onMouseup);

  useEffect(
    () => setCanUndo(backLength > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backLength]
  );
  useEffect(
    () => setCanRedo(forwardLength > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forwardLength]
  );

  function onDrawStart(e: Position) {
    const isStart = true;
    const newLines = [...(lines ?? []), []];
    setIsDrawing(isStart);
    onDraw(e, isStart, newLines);
  }

  function onDraw(pos: Position, isStart: boolean, lines: Line[]) {
    if (!isStart) return;

    const currentLine = lines[lines.length - 1];
    const prevPoint = currentLine[currentLine.length - 1];
    const rect = svgRef.current!.getBoundingClientRect();
    const point: Point = [pos.x - rect.left, pos.y - rect.top];
    if (
      !prevPoint ||
      Math.abs(prevPoint[0] - point[0]) >= 1 ||
      Math.abs(prevPoint[1] - point[1]) >= 1
    ) {
      currentLine.push(point);
      setLines([...lines]);
    }
  }

  function onDrawEnd() {
    if (!isDrawing) return;

    setIsDrawing(false);
    commit();
  }

  function onClear() {
    commit([]);
  }

  return (
    <div relative full>
      <svg {...svgAttrs} ref={svgRef} onMouseDown={(e) => onMouseDown(e)}>
        <rect {...bgRectAttrs} />
        <g mask="url(#brush)">
          {paths?.map((p, i) => (
            <path key={i} {...p} />
          ))}
        </g>
        <mask id="brush">
          <rect x="0" y="0" width="100%" height="100%" fill="black" />
          {brushworkLines?.map((p, i) => (
            <path key={i} {...p} fill="white" />
          ))}
        </mask>
      </svg>
    </div>
  );
};

export default forwardRef(SvgCanvas);
