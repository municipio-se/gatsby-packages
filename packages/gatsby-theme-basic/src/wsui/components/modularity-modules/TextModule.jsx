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
      link, // TODO: Remove this since it's no longer used
      icon,
      displayMode, // TODO: Remove this since it's no longer used
      backgroundImage, // TODO: Remove this since it's no longer used
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
      backgroundImage={backgroundImage}
      links={links}
      expandable={expandable}
      {...restProps}
    />
  );
}
