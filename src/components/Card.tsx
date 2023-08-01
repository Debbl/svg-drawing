import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div
      relative
      cursor-none
      full
      overflow-hidden
      box-border
      rounded-8
      p-1px
      border="~ gray solid"
      className={props.className}
    >
      {props.children}
    </div>
  );
};

export default Card;
