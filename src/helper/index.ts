import type { Point } from "~/types";

const download = (href: string, filename: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
};

const svgCode2Url = (svgCode: string) => {
  return `data:image/svg+xml;base64,${btoa(svgCode)}`;
};

const distance = (p1: Point, p2: Point) =>
  Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);

const lineLength = (line: Point[]) => {
  return line.reduce(
    (acc, p, i) => acc + (i > 0 ? distance(p, line[i - 1]) : 0),
    0
  );
};

const tab = (code: string) => {
  return `  ${code}`;
};

const tag = (tagName: string, props: Record<string, any>, children?: any[]) => {
  return [
    `<${tagName} ${Object.entries(props)
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ")}>`,
    `${children ? children.filter(Boolean).join("") : ""}`,
    `</${tagName}>`,
  ].join("\n");
};

const helper = {
  download,
  svgCode2Url,
  lineLength,
  tab,
  tag,
};

export default helper;
