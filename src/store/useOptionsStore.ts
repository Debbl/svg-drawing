import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { BrushOptions, DrawOptions, ReplayOptions } from "~/types";

export interface OptionsState {
  draw: DrawOptions;
  replay: ReplayOptions;
  brush: BrushOptions;
}

export interface OptionsActions {
  setOptions: (options: OptionsState) => void;
}

const useOptionsStore = create<OptionsState & OptionsActions>()(
  combine(
    {
      draw: {
        color: "#000",
        background: "#fff",
        strokeWidth: 10,
      },
      replay: {
        easing: "ease",
        loop: true,
        speed: 500,
        loopInterval: 1000,
        wipe: 500,
      },
      brush: {
        disable: false,
        thinning: 0.75,
        streamline: 0,
        start: {
          cap: true,
          taper: 90,
        },
        end: {
          cap: false,
          taper: 90,
        },
      },
    },
    (set) => ({
      setOptions: (options) => set(options),
    })
  )
);

export default useOptionsStore;
