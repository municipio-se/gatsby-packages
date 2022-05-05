import "./src/index.css";
import React from "react";

import BrandColorWrapper from "./src/components/BrandColorWrapper";
import pluginOptionsContext from "./src/contexts/pluginOptionsContext";

export const wrapPageElement = ({ element }) => {
  return (
    <pluginOptionsContext.Provider value={{}}>
      <BrandColorWrapper>{element}</BrandColorWrapper>
    </pluginOptionsContext.Provider>
  );
};
