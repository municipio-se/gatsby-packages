import "./src/index.css";
import React from "react";

import BrandColorWrapper from "./src/components/BrandColorWrapper";

export const wrapPageElement = ({ element }) => {
  return <BrandColorWrapper>{element}</BrandColorWrapper>;
};
