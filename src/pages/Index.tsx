import type { ElementRef } from "react";
import React, { useRef } from "react";
import SvgCanvas from "../components/SvgCanvas";
import Card from "~/components/Card";
import PenCursor from "~/components/PenCursor";

const Index: React.FC = () => {
  const svgCanvasRef = useRef<ElementRef<typeof SvgCanvas>>(null);

  return (
    <div text-center>
      <div inline-block>
        <Card className="h-[600px] w-[800px]">
          <SvgCanvas ref={svgCanvasRef} width={800} height={600} />
          <PenCursor />
        </Card>
      </div>

      <div>
        <button onClick={() => svgCanvasRef.current?.onClear()}>clear</button>
        <button
          onClick={() => {
            svgCanvasRef.current?.undo();
          }}
        >
          undo
        </button>
        <button onClick={() => svgCanvasRef.current?.redo()}>redo</button>
      </div>
    </div>
  );
};

export default Index;
