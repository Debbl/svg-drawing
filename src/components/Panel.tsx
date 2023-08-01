import type { ElementRef, RefObject } from "react";
import React from "react";
import Input from "./Input";
import type SvgCanvas from "./SvgCanvas";
import helper from "~/helper";

interface Props {
  canUndo: boolean;
  canRedo: boolean;
  height: number;
  width: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  svgCanvasRef: RefObject<ElementRef<typeof SvgCanvas>>;
}

const Panel: React.FC<Props> = ({
  canRedo,
  canUndo,
  height,
  width,
  setHeight,
  setWidth,
  svgCanvasRef,
}) => {
  return (
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

      <div>
        <button
          flex="~ center"
          gap-1
          h10
          btn
          border-style-none
          onClick={() =>
            helper.download(
              svgCanvasRef.current?.getSvgUrl() ?? "",
              "svg-drawing.svg"
            )
          }
        >
          <div i-carbon:download></div>
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Panel;
