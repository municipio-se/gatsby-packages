/* global GATSBY_MUNICIPIO_THEME_BASIC_ROOT_ELEMENT_WRAPPER_PATH */

import React from "react";

import BrandColorWrapper from "./src/components/BrandColorWrapper";
import pluginOptionsContext from "./src/contexts/pluginOptionsContext";

const RootElementWrapper =
  require(GATSBY_MUNICIPIO_THEME_BASIC_ROOT_ELEMENT_WRAPPER_PATH).default;

export const wrapRootElement = ({ element }) => {
  return <RootElementWrapper>{element}</RootElementWrapper>;
};

export const wrapPageElement = ({ element }) => {
  return (
    <pluginOptionsContext.Provider value={{}}>
      <BrandColorWrapper>{element}</BrandColorWrapper>
    </pluginOptionsContext.Provider>
  );
};
