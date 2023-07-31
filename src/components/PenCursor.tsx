import React, { useRef } from "react";
import { useMouse } from "ahooks";

const PenCursor: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const { clientX, clientY } = useMouse(elRef.current);

  // const cursorStyle = {
  //   left: `${clientX}px`,
  //   top: `${clientY}px,`,
  // };

  return (
    <div absolute inset-0 cursor-none ref={elRef}>
      <div
        relative
        translate-y="-100%"
        className="i-solar:pen-bold-duotone"
        transition-transform
        style={{ left: `${clientX}px`, top: `${clientY}px` }}
      />
    </div>
  );
}

export default PenCursor;
