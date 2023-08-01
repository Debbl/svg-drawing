import type { ElementRef } from "react";
import React, { useRef, useState } from "react";
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

  return (
    <div text-center relative>
      <div inline-block>
        <Card className="h-[600px] w-[800px]">
          <SvgCanvas
            ref={svgCanvasRef}
            width={width}
            height={height}
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
