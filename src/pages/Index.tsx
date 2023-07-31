import React from "react";
import SvgCanvas from "../components/SvgCanvas";

const Index: React.FC = () => {
  return (
    <div className="text-center">
      <div className="border border-red border-solid inline-block">
        <SvgCanvas height={600} width={800} />
      </div>
    </div>
  );
};

export default Index;
