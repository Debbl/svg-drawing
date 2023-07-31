import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div
      className={`relative cursor-none full overflow-hidden box-border rounded-8 p-1px ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
