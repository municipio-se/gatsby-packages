import { useThemeProps } from "@wsui/base";
import { TextModuleController } from "@wsui/municipio";
import React, { useContext } from "react";

import modularityModuleContext from "../../../modularityModuleContext";

export default function TextModule(props) {
  props = useThemeProps({ props, name: "MunicipioTextModule" });
  let { module, ...restProps } = props;

  let {
    modTextOptions: {
      expandable,
      hideBoxFrame = false,
      theme: color,
      link,
      icon,
      displayMode,
      links,
    },
  } = module;

  let { align } = useContext(modularityModuleContext);

  return (
    <TextModuleController
      color={(!hideBoxFrame && color) || undefined}
      link={link}
      icon={icon}
      displayMode={displayMode}
      align={align}
      links={links}
      expandable={expandable}
      {...restProps}
    />
  );
}
