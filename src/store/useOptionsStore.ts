import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { StoreKeys, storeVersion } from "~/constants";
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
  persist(
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
    ),
    {
      name: StoreKeys.Options,
      version: storeVersion,
    }
  )
);

export default useOptionsStore;
