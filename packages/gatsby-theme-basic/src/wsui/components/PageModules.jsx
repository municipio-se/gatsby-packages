import { useThemeProps, mergeProps } from "@wsui/base";
import React from "react";

import usePageModules from "../usePageModules.js";

import ModularityArea from "./ModularityArea.jsx";

export default function PageModules(props) {
  props = useThemeProps({ props, name: "PageModules" });
  let { area, ignoreBackgrounds, ...restProps } = props;

  restProps = mergeProps(
    {
      components: {
        PageSection: {
          "data-modularity-area": area,
        },
      },
    },
    restProps,
  );

  let moduleRows = usePageModules(area, { ignoreBackgrounds });

  return <ModularityArea moduleRows={moduleRows} {...restProps} />;
}
