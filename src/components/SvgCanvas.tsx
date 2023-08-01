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
import { throttle } from "lodash-es";
import type {
  BrushOptions,
  DrawOptions,
  Line,
  Point,
  Position,
  SvgReplayOptions,
} from "~/types";
import useManualHistoryTravel from "~/hooks/useManualHistoryTravel";

interface Props {
  width: number;
  height: number;
  densities?: number;
  initialLines?: Line[];
  drawOptions?: DrawOptions;
  replayOptions?: SvgReplayOptions;
  brushOptions?: BrushOptions;
  setCanUndo?: (canUndo: boolean) => void;
  setCanRedo?: (canRedo: boolean) => void;
}

interface ImperativeHandle {
  onClear: () => void;
  undo: () => void;
  redo: () => void;
}

const SvgCanvas: ForwardRefRenderFunction<ImperativeHandle, Props> = (
  props,
  ref
) => {
  const svgAttrs = {
    width: props.width,
    height: props.height,
    viewBox: `0 0 ${props.width} ${props.height}`,
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
  };
  const bgReactAttr = {
    x: "0",
    y: "0",
    width: props.width,
    height: props.height,
    fill: props.drawOptions?.background ?? "white",
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const {
    value: lines,
    setState: setLines,
    commit,
    back,
    forward,
    forwardLength,
    backLength,
  } = useManualHistoryTravel<Line[]>([...(props.initialLines ?? [])]);

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
            strokeWidth: props.drawOptions?.strokeWidth ?? "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: props.drawOptions?.color ?? "black",
            fill: "none",
          } as SVGProps<SVGPathElement>)
      ),
    [lines, props.drawOptions?.color, props.drawOptions?.strokeWidth]
  );
  const brushworkLines = useMemo(
    () =>
      lines?.map((line) => {
        const points = getStroke(line, props.brushOptions);
        const d = `M${points
          .map((p) => p.map((v) => v.toFixed(2)).join(","))
          .join("L")}Z`;
        return { d };
      }),
    [lines, props.brushOptions]
  );

  const onMouseDown: MouseEventHandler<SVGSVGElement> = (e) =>
    onDrawStart({ x: e.clientX, y: e.clientY });
  const onMousemove = throttle(
    (e: MouseEvent) =>
      onDraw({ x: e.clientX, y: e.clientY }, isDrawing, lines!),
    30
  );
  const onMouseup = (_: MouseEvent) => onDrawEnd();

  useImperativeHandle(ref, () => ({
    onClear,
    undo: back,
    redo: forward,
  }));

  useEventListener("mousemove", onMousemove);
  useEventListener("mouseup", onMouseup);

  useEffect(
    () => props.setCanUndo && props.setCanUndo(backLength > 0),
    [backLength, props]
  );
  useEffect(
    () => props.setCanRedo && props.setCanRedo(forwardLength > 0),
    [forwardLength, props]
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
        <rect {...bgReactAttr} />
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
