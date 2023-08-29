import type { ElementRef } from "react";
import React, { useRef } from "react";
import { Leva } from "leva";
import SvgCanvas from "../components/SvgCanvas";
import Card from "~/components/Card";
import PenCursor from "~/components/PenCursor";
import Panel from "~/components/Panel";
import useLevaControls from "~/hooks/useLevaControls";
import SvgPreviewer from "~/components/SvgPreviewer";

const Index: React.FC = () => {
  useLevaControls();

  const svgCanvasRef = useRef<ElementRef<typeof SvgCanvas>>(null);

  return (
    <div text-center relative>
      <Leva collapsed={true} hideCopyButton={true} />

      <div inline-block>
        <Card>
          <SvgCanvas ref={svgCanvasRef} />
          <PenCursor />
        </Card>
      </div>

      <SvgPreviewer />

      <Panel svgCanvasRef={svgCanvasRef} />
    </div>
  );
};

export default Index;
