import React from "react";
import SvgCanvas from "../components/SvgCanvas";

const Index: React.FC = () => {
  return (
    <div text-center>
      <div border="~ red solid" inline-block>
        <SvgCanvas height={600} width={800} />
      </div>
    </div>
  );
};

export default Index;
