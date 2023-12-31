import React, { useRef, useState } from "react";
import { useEventListener, useMouse } from "ahooks";

const PenCursor: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);

  const { elementX, elementY } = useMouse(elRef.current);

  useEventListener("mousedown", () => setIsDown(true));
  useEventListener("mouseup", () => setIsDown(false));

  const cursorStyle = {
    left: `${elementX}px`,
    top: `${elementY}px`,
  };

  return (
    <div pointer-events-none absolute inset-0 ref={elRef}>
      <div
        i-solar:pen-bold-duotone
        relative
        translate-y="-1/1"
        transition-transform
        origin-bottom-right
        className={`${isDown ? "scale-85" : ""}`}
        style={cursorStyle}
      />
    </div>
  );
};

export default PenCursor;
