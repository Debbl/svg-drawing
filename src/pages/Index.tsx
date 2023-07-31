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
        <Card>
          <SvgCanvas ref={svgCanvasRef} height={600} width={800} />
          <PenCursor />
        </Card>
      </div>
    </div>
  );
};

export default Index;
