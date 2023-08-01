import type { ElementRef } from "react";
import React, { useRef, useState } from "react";
import { Leva, folder, useControls } from "leva";
import SvgCanvas from "../components/SvgCanvas";
import Card from "~/components/Card";
import PenCursor from "~/components/PenCursor";
import Panel from "~/components/Panel";

const Index: React.FC = () => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(800);

  const svgCanvasRef = useRef<ElementRef<typeof SvgCanvas>>(null);

  const {
    background,
    color,
    strokeWidth,
    easing,
    loop,
    speed,
    loopInterval,
    wipe,
    disable,
    thinning,
    startTaper,
    endTaper,
    smoothing,
    streamline,
  } = useControls({
    "draw Options": folder(
      {
        background: {
          label: "Background",
          value: "#fff",
        },
        color: {
          label: "Color",
          value: "#000",
        },
        strokeWidth: {
          label: "StrokeWidth",
          value: 10,
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
          value: true,
        },
        speed: {
          label: "Speed",
          value: 500,
          min: 50,
          max: 2000,
        },
        loopInterval: {
          label: "LoopInterval",
          value: 1000,
          min: 100,
          max: 5000,
          step: 50,
        },
        wipe: {
          label: "Wipe",
          value: 500,
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
          value: false,
        },
        thinning: {
          label: "Thinning",
          value: 0.75,
          min: 0,
          max: 1,
        },
        startTaper: {
          label: "Start Taper",
          value: 90,
          min: 0,
          max: 100,
          step: 1,
        },
        endTaper: {
          label: "End Taper",
          value: 90,
          min: 0,
          max: 100,
          step: 1,
        },
        Experimental: folder({
          streamline: {
            label: "Streamline",
            value: 0,
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

  return (
    <div text-center relative>
      <Leva collapsed={true} hideCopyButton={true} />

      <div inline-block>
        <Card className="h-[600px] w-[800px]">
          <SvgCanvas
            ref={svgCanvasRef}
            width={width}
            height={height}
            drawOptions={{ background, color, strokeWidth }}
            replayOptions={{ easing, loop, speed, loopInterval, wipe }}
            brushOptions={{
              disable,
              thinning,
              streamline,
              smoothing,
              start: {
                cap: true,
                taper: startTaper,
              },
              end: {
                cap: true,
                taper: endTaper,
              },
            }}
            setCanRedo={(canRedo) => setCanRedo(canRedo)}
            setCanUndo={(canUndo) => setCanUndo(canUndo)}
          />
          <PenCursor />
        </Card>
      </div>

      <Panel
        canRedo={canRedo}
        canUndo={canUndo}
        height={height}
        width={width}
        setHeight={setHeight}
        setWidth={setWidth}
        svgCanvasRef={svgCanvasRef}
      />
    </div>
  );
};

export default Index;
