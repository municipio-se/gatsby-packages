import "./src/index.css";
import React from "react";

import BrandColorWrapper from "./src/components/BrandColorWrapper";
import FeedbackFormProvider from "./src/components/FeedbackFormProvider";

export const wrapPageElement = ({ element }) => {
  return (
    <BrandColorWrapper>
      <FeedbackFormProvider>{element}</FeedbackFormProvider>
    </BrandColorWrapper>
  );
};
