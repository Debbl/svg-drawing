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
    <div full text-center relative flex="~ items-center justify-center">
      <Leva collapsed={true} hideCopyButton={true} />

      <div flex="~ col gap-y-2">
        <Card>
          <SvgCanvas ref={svgCanvasRef} />
          <PenCursor />
        </Card>
        <Panel svgCanvasRef={svgCanvasRef} />
      </div>

      <SvgPreviewer />
    </div>
  );
};

export default Index;
