import type { ElementRef } from "react";
import React, { useRef, useState } from "react";
import SvgCanvas from "../components/SvgCanvas";
import Card from "~/components/Card";
import PenCursor from "~/components/PenCursor";
import Input from "~/components/Input";

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

      <div flex="~ center" gap-x-3 absolute left="1/2" translate-x="-1/2">
        <div flex="~ items-center" gap-2>
          <button
            flex="~ center"
            h10
            w10
            px-2
            btn-outline
            disabled={!canUndo}
            onClick={() => svgCanvasRef.current?.undo()}
          >
            <div i-carbon:undo />
          </button>
          <button
            flex="~ center"
            h10
            w10
            px-2
            btn-outline
            disabled={!canRedo}
            onClick={() => svgCanvasRef.current?.redo()}
          >
            <div i-carbon:redo />
          </button>
          <button
            flex="~ center"
            h10
            w20
            gap-1
            px-2
            text-sm
            btn-outline
            sm="w-auto px-4"
            onClick={() => svgCanvasRef.current?.onClear()}
          >
            <div i-carbon:trash-can />
            <span display-none sm:display-inline>
              Clear
            </span>
          </button>
        </div>

        <div flex="~ center">
          <Input value={height} setValue={setHeight} suffix="px" />
          <span mx-3>{"*"}</span>
          <Input value={width} setValue={setWidth} suffix="px" />
        </div>
      </div>
    </div>
  );
};

export default Index;
