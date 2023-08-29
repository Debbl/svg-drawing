import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { StoreKeys, storeVersion } from "~/constants";
import type { Line } from "~/types";

export interface SvgState {
  lines: Line[];
  svg: string;
}

export interface SvgActions {
  setLines: (lines: Line[]) => void;
  setSvg: (svg: string) => void;
}

const useSvgStore = create<SvgState & SvgActions>()(
  persist(
    combine(
      {
        lines: [] as Line[],
        svg: "",
      },
      (set) => ({
        setSvg: (svg) => set({ svg }),
        setLines: (lines) => set({ lines }),
      })
    ),
    {
      name: StoreKeys.Svg,
      version: storeVersion,
    }
  )
);

export default useSvgStore;
