import React, { useRef } from "react";
import { useMouse } from "ahooks";

const PenCursor: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const { elementX, elementY } = useMouse(elRef.current);

  const cursorStyle = {
    left: `${elementX}px`,
    top: `${elementY}px`,
  };

  return (
    <div className="absolute inset-0 cursor-none" ref={elRef}>
      <div
        className="i-solar:pen-bold-duotone relative transition-transform"
        style={cursorStyle}
      />
    </div>
  );
};

export default PenCursor;
