import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface SvgState {
  svg: string;
}

export interface SvgActions {
  setSvg: (svg: string) => void;
}

const useSvgStore = create<SvgState & SvgActions>()(
  combine(
    {
      svg: "",
    },
    (set) => ({
      setSvg: (svg) => set({ svg }),
    })
  )
);

export default useSvgStore;
