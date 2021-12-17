import { Global } from "@emotion/react";
import * as nyans from "@nyans/parser";
import chroma from "chroma-js";
import { graphql, useStaticQuery } from "gatsby";
import { kebabCase, transform } from "lodash";
import PropTypes from "prop-types";
import React from "react";

BrandColorWrapper.propTypes = {
  children: PropTypes.node,
};

export default function BrandColorWrapper({ children }) {
  let colorItems =
    useStaticQuery(graphql`
      query BrandColors {
        wp {
          ...WP_BrandColorsForHook
        }
      }
    `).wp.acfOptionsThemeOptions?.colorScheme?.brandColors || [];

  let colors = nyans.normalize(nyans.parse(colorItems));

  let vars = {};

  colors.forEach(({ key, value, shades }) => {
    let color = chroma(value);
    vars[`--brand-color-${kebabCase(key)}`] = value;
    vars[`--brand-color-${kebabCase(key)}-text`] =
      chroma.contrast(color, "black") >= 4.51 ? "black" : "white";
    Object.entries(shades, {}).forEach(([level, shade]) => {
      vars[`--brand-color-${kebabCase(key)}-${level}`] = shade;
      vars[`--brand-color-${kebabCase(key)}-${level}-text`] =
        chroma.contrast(shade, "black") >= 4.51 ? "black" : "white";
    });
  });

  return (
    <>
      <Global
        styles={{
          ":root": vars,
        }}
      />
      {children}
    </>
  );
}
