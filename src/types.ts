import type getStroke from "perfect-freehand";

export interface Position {
  x: number;
  y: number;
}

export interface SvgReplayOptions {
  speed?: number;
  loop?: boolean;
  easing?: string;
  wipe?: number;
  loopInterval?: number;
}

export type Point = [number, number];
export type Line = Point[];

export interface DrawOptions {
  color?: string;
  background?: string;
  strokeWidth?: number;
}

export type BrushOptions = Parameters<typeof getStroke>[1] & {
  disable?: boolean;
};
