import "./src/index.css";
import React from "react";

import BrandColorWrapper from "./src/components/BrandColorWrapper";
import FeedbackFormProvider from "./src/components/FeedbackFormProvider";
import pluginOptionsContext from "./src/contexts/pluginOptionsContext";

export const wrapPageElement = ({ element }) => {
  return (
    <pluginOptionsContext.Provider value={{}}>
      <BrandColorWrapper>
        <FeedbackFormProvider>{element}</FeedbackFormProvider>
      </BrandColorWrapper>
    </pluginOptionsContext.Provider>
  );
};
