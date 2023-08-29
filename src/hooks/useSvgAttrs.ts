import type { SVGProps } from "react";
import helper from "~/helper";
import useOptionsStore from "~/store/useOptionsStore";
import usePanelStore from "~/store/usePanelStore";
import type { Line, ReplayOptions } from "~/types";

const useSvgAttrs = () => {
  const { width, height } = usePanelStore((s) => ({
    width: s.width,
    height: s.height,
  }));
  const { brushOptions, background } = useOptionsStore((s) => ({
    background: s.draw.background,
    brushOptions: s.brush,
  }));

  const svgAttrs = {
    width,
    height,
    "viewBox": `0 0 ${width} ${height}`,
    "xmlns": "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
  };

  const bgRectAttrs = {
    x: "0",
    y: "0",
    width,
    height,
    fill: background ?? "white",
  };

  function getSvg(
    paths: SVGProps<SVGPathElement>[],
    lines: Line[],
    options: ReplayOptions,
    brushworkLines: {
      d: string;
    }[]
  ) {
    if (!paths.length) return "";

    const {
      speed = 500,
      loop = false,
      easing = "ease",
      loopInterval = 1000,
      wipe = 500,
    } = options;

    const lineLengths = lines.map((line) => helper.lineLength(line));
    const totalLength = lineLengths.reduce((sum, length) => sum + length, 0);
    const drawDuration = (totalLength / speed) * 1000;
    const delayDuration = loopInterval ?? 0;
    const wipeDuration = wipe ?? 0;
    const totalDuration = drawDuration + delayDuration + wipeDuration;

    const lineDurations: number[] = [];
    const lineDelays: number[] = [];
    const lineDelayReverse: number[] = [];
    let delay = 0;
    for (const line of lines) {
      const length = helper.lineLength(line);
      const duration = (length / speed) * 1000;
      lineDurations.push(duration);
      lineDelays.push(delay);
      delay += duration;
    }
    lines.forEach((_, i) => {
      lineDelayReverse.push(
        totalDuration -
          wipeDuration -
          (lineDelays[i] / drawDuration) * wipeDuration
      );
    });

    const styles = lines.map((_, i) => {
      const length = Number(lineLengths[i].toFixed(0));
      const lineDrawDuration = lineDurations[i];
      const lineDelayDuration = lineDelays[i];
      const lineDelayReverseDuration = lineDelayReverse[i];
      const startDrawPercent = (lineDelayDuration / totalDuration) * 100;
      const stopDrawPercent =
        ((lineDelayDuration + lineDrawDuration) / totalDuration) * 100;
      const wipeStartPercent = (lineDelayReverseDuration / totalDuration) * 100;
      const wipeStopPercent =
        ((lineDelayReverseDuration +
          (lineDrawDuration / drawDuration) * wipeDuration) /
          totalDuration) *
        100;
      const styleArr = [
        `path.line-${i} {`,
        helper.tab(`stroke-dasharray: ${length} ${length + 5};`),
        helper.tab(`stroke-dashoffset: ${length};`),
        helper.tab(
          `animation: draw-${i} ${totalDuration}ms ${easing} forwards ${
            loop ? "infinite" : ""
          };`
        ),
        "}",
        `@keyframes draw-${i} {`,
        helper.tab(`0% { stroke-dashoffset: ${length}; }`),
        startDrawPercent === 0
          ? null
          : helper.tab(
              `${startDrawPercent}% { stroke-dashoffset: ${length}; }`
            ),
        helper.tab(`${stopDrawPercent.toFixed(2)}% { stroke-dashoffset: 0; }`),
        helper.tab(`${wipeStartPercent.toFixed(2)}% { stroke-dashoffset: 0; }`),
        wipe
          ? helper.tab(
              `${wipeStopPercent.toFixed(2)}% { stroke-dashoffset: ${length}; }`
            )
          : null,
        helper.tab(`100% { stroke-dashoffset: ${wipe ? length : 0}; }`),
        "}",
      ].filter(Boolean);
      // lastPercent = newPercent
      return styleArr.join("\n");
    });
    const styleTag = `<style>\n${styles.join("\n")}\n</style>`;

    return helper.tag(
      "svg",
      {
        ...(svgAttrs || {}),
        "data-cache": Date.now(),
      },
      [
        styleTag,
        helper.tag("rect", bgRectAttrs),
        helper.tag(
          "g",
          { mask: "url(#brush)" },
          paths.map((p, i) =>
            helper.tag("path", {
              ...p,
              class: `line-${i}`,
            })
          )
        ),
        brushOptions?.disable
          ? null
          : helper.tag("mask", { id: "brush" }, [
              helper.tag("rect", {
                x: 0,
                y: 0,
                width: "100%",
                height: "100%",
                fill: "black",
              }),
              ...brushworkLines.map((p) =>
                helper.tag("path", {
                  ...p,
                  fill: "white",
                })
              ),
            ]),
      ]
    );
  }

  return {
    svgAttrs,
    bgRectAttrs,
    getSvg,
  };
};

export default useSvgAttrs;
