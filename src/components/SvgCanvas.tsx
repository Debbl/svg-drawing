import type { MouseEventHandler, SVGProps } from "react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getStroke } from "perfect-freehand";
import { useEventListener } from "ahooks";
import { throttle } from "lodash-es";

interface Position {
  x: number;
  y: number;
}

type Point = [number, number];
type Line = Point[];

const bgReactAttr = {
  x: "0",
  y: "0",
  width: "800",
  height: "600",
  fill: "#fff",
};

const svgAttrs = {
  width: "800",
  height: "600",
  viewBox: `0 0 ${800} ${600}`,
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
};

const SvgCanvas: React.FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>(() => [
    [
      [239, 245.5],
      [240, 245.5],
      [241, 245.5],
      [242, 245.5],
      [244, 245.5],
      [246, 245.5],
      [247, 245.5],
      [248, 245.5],
      [250, 245.5],
      [251, 245.5],
      [253, 245.5],
      [255, 245.5],
      [258, 245.5],
      [262, 245.5],
      [265, 245.5],
      [268, 245.5],
      [270, 245.5],
      [276, 245.5],
      [283, 245.5],
      [287, 245.5],
      [293, 245.5],
      [302, 245.5],
      [308, 245.5],
      [313, 245.5],
      [318, 245.5],
      [322, 245.5],
      [328, 245.5],
      [334, 245.5],
      [340, 245.5],
      [346, 245.5],
      [353, 245.5],
      [359, 245.5],
      [365, 245.5],
      [371, 245.5],
      [378, 245.5],
      [387, 245.5],
      [393, 245.5],
      [399, 245.5],
      [404, 245.5],
      [409, 245.5],
      [414, 245.5],
      [418, 246.5],
      [423, 246.5],
      [426, 246.5],
      [430, 247.5],
      [433, 247.5],
      [436, 247.5],
      [440, 248.5],
      [442, 248.5],
      [445, 249.5],
      [447, 249.5],
      [449, 249.5],
      [452, 250.5],
      [454, 250.5],
      [457, 251.5],
      [461, 251.5],
      [464, 252.5],
      [465, 252.5],
      [467, 253.5],
      [468, 253.5],
      [469, 253.5],
      [470, 253.5],
      [472, 253.5],
      [473, 254.5],
      [474, 254.5],
      [475, 254.5],
      [477, 254.5],
      [478, 254.5],
      [479, 255.5],
      [480, 255.5],
      [481, 255.5],
      [482, 255.5],
      [484, 256.5],
      [485, 256.5],
      [486, 256.5],
      [487, 256.5],
      [488, 256.5],
      [489, 256.5],
      [490, 256.5],
      [491, 257.5],
      [492, 257.5],
      [493, 257.5],
      [494, 257.5],
      [495, 257.5],
      [496, 257.5],
      [497, 257.5],
      [498, 257.5],
      [498, 256.5],
      [498, 255.5],
      [497, 255.5],
      [497, 254.5],
    ],
  ]);

  const paths = useMemo(
    () =>
      lines.map(
        (line) =>
          ({
            d:
              line.length === 1
                ? `M${line[0].join(" ")}L${line[0].join(" ")}`
                : `M${line.map((p) => p.join(",")).join("L")}`,
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "#000",
            fill: "none",
          } as SVGProps<SVGPathElement>)
      ),
    [lines]
  );

  const brushworkLines = useMemo(
    () =>
      lines.map((line) => {
        const points = getStroke(line, {
          // to make sure that mask matches the path
          smoothing: 0,
          streamline: 0,

          thinning: 0.75,
          start: {
            cap: true,
            taper: 90,
          },
          end: {
            cap: true,
            taper: 90,
          },
        });
        const d = `M${points
          .map((p) => p.map((v) => v.toFixed(2)).join(","))
          .join("L")}Z`;
        return { d };
      }),
    [lines]
  );

  const svgRef = useRef<SVGSVGElement>(null);

  const onMouseDown: MouseEventHandler<SVGSVGElement> = (e) =>
    onDrawStart({ x: e.clientX, y: e.clientY });
  const onMousemove = (e: MouseEvent) =>
    throttle(
      () => onDraw({ x: e.clientX, y: e.clientY }, drawing, lines),
      33
    )();
  const onMouseup = (_: MouseEvent) => onDrawEnd();

  useEffect(() => {
    console.log(svgRef.current);
  }, []);

  useEventListener("mousemove", onMousemove);
  useEventListener("mouseup", onMouseup);

  function onDrawStart(e: Position) {
    const isStart = true;
    const newLines = [...lines, []];
    setDrawing(isStart);
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
    if (!drawing) return;

    setDrawing(false);
  }

  return (
    <div>
      <svg {...svgAttrs} ref={svgRef} onMouseDown={(e) => onMouseDown(e)}>
        <rect {...bgReactAttr} />
        <g mask="url(#brush)">
          {paths.map((p, i) => (
            <path key={i} {...p} />
          ))}
        </g>
        <mask id="brush">
          <rect x="0" y="0" width="100%" height="100%" fill="black" />
          {brushworkLines.map((p, i) => (
            <path key={i} {...p} fill="white" />
          ))}
        </mask>
      </svg>
    </div>
  );
};

export default SvgCanvas;
