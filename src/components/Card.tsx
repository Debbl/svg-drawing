import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className="relative full overflow-hidden border-1 border-red border-solid rounded-8 p-1px">
      {props.children}
    </div>
  );
};

export default Card;
