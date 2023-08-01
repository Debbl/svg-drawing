import React from "react";

interface Props {
  value: number;
  suffix?: string;
  setValue: (value: number) => void;
}

const Input: React.FC<Props> = (props) => {
  return (
    <div
      flex="~ center"
      p2
      w24
      h10
      box-border
      rounded-2
      h="2.5rem"
      font-medium
      bg-white
      border="~ color-purple-600 solid"
      gap-x-1
    >
      <input
        w12
        type="number"
        outline-none
        border-none
        value={props.value}
        onChange={(e) => props.setValue(+e.target.value || 0)}
      />
      <div>{props.suffix ?? ""}</div>
    </div>
  );
};

export default Input;
