import { folder, useControls } from "leva";
import { useEffect } from "react";
import type { OptionsState } from "~/store/useOptionsStore";
import useOptionsStore from "~/store/useOptionsStore";

const useLevaControls = () => {
  const { options, setOptions } = useOptionsStore((s) => ({
    options: {
      draw: s.draw,
      replay: s.replay,
      brush: s.brush,
    } as OptionsState,
    setOptions: s.setOptions,
  }));

  const _options = useControls({
    "draw Options": folder(
      {
        background: {
          label: "Background",
          value: options.draw.background,
        },
        color: {
          label: "Color",
          value: options.draw.color,
        },
        strokeWidth: {
          label: "StrokeWidth",
          value: options.draw.strokeWidth,
          min: 1,
          max: 40,
        },
      },
      {
        collapsed: true,
      }
    ),
    "Replay Options": folder(
      {
        easing: {
          label: "Easing",
          options: ["ease", "linear", "ease-in", "ease-out", "ease-in-out"],
        },
        loop: {
          label: "Loop",
          value: options.replay.loop,
        },
        speed: {
          label: "Speed",
          value: options.replay.speed,
          min: 50,
          max: 2000,
        },
        loopInterval: {
          label: "LoopInterval",
          value: options.replay.loopInterval,
          min: 100,
          max: 5000,
          step: 50,
        },
        wipe: {
          label: "Wipe",
          value: options.replay.wipe,
          min: 0,
          max: 5000,
        },
      },
      {
        collapsed: true,
      }
    ),
    "brush Options": folder(
      {
        disable: {
          label: "Disable",
          value: options.brush.disable,
        },
        thinning: {
          label: "Thinning",
          value: options.brush.thinning,
          min: 0,
          max: 1,
        },
        startTaper: {
          label: "Start Taper",
          value: options.brush.start.taper,
          min: 0,
          max: 100,
          step: 1,
        },
        endTaper: {
          label: "End Taper",
          value: options.brush.end.taper,
          min: 0,
          max: 100,
          step: 1,
        },
        Experimental: folder({
          streamline: {
            label: "Streamline",
            value: options.brush.streamline,
            min: 0,
            max: 1,
            step: 0.01,
          },
          smoothing: {
            label: "Smoothing",
            value: 0,
            min: 0,
            max: 1,
            step: 0.01,
          },
        }),
      },
      {
        collapsed: true,
      }
    ),
  });

  useEffect(() => {
    setOptions({
      draw: {
        background: _options.background,
        color: _options.color,
        strokeWidth: _options.strokeWidth,
      },
      replay: {
        easing: _options.easing,
        loop: _options.loop,
        loopInterval: _options.loopInterval,
        speed: _options.speed,
        wipe: _options.wipe,
      },
      brush: {
        disable: _options.disable,
        thinning: _options.thinning,
        streamline: _options.streamline,
        start: {
          cap: true,
          taper: _options.startTaper,
        },
        end: {
          cap: true,
          taper: _options.endTaper,
        },
      },
    });
  }, [_options, setOptions]);

  return { options };
};

export default useLevaControls;
