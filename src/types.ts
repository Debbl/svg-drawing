export interface Position {
  x: number;
  y: number;
}

export interface ReplayOptions {
  speed: number;
  loop: boolean;
  easing: string;
  wipe: number;
  loopInterval: number;
}

export type Point = [number, number];
export type Line = Point[];

export interface DrawOptions {
  color: string;
  background: string;
  strokeWidth: number;
}

export interface BrushOptions {
  disable: boolean;
  thinning: number;
  streamline: number;
  start: {
    cap: boolean;
    taper: number;
  };
  end: {
    cap: boolean;
    taper: number;
  };
}
