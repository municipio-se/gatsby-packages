import { useThemeProps } from "@wsui/base";
import { TextModule as WsuiTextModule } from "@wsui/municipio";
import React, { useContext } from "react";

import modularityAreaContext from "../../../modularityAreaContext";
import modularityModuleContext from "../../../modularityModuleContext";
import modularityRowContext from "../../../modularityRowContext";

export default function TextModule(props) {
  props = useThemeProps({ props, name: "MunicipioTextModule" });
  let {
    title,
    description,
    module: {
      modTextOptions: {
        hideBoxFrame = false,
        theme: color,
        link,
        icon,
        displayMode,
        backgroundImage,
      },
    },
    ...restProps
  } = props;

  const { centerLonelyModules } = useContext(modularityAreaContext);
  const { modules } = useContext(modularityRowContext);
  let { align } = useContext(modularityModuleContext);

  align =
    align || (centerLonelyModules && modules.length === 1)
      ? "center"
      : undefined;

  // if (!theme?.includes(".")) {
  //   theme = [theme, 100];
  // }

  return (
    <WsuiTextModule
      color={(!hideBoxFrame && color && [100, color]) || undefined}
      title={title}
      content={description}
      link={link}
      icon={icon}
      displayMode={displayMode}
      align={align}
      backgroundImage={backgroundImage}
      {...restProps}
    />
  );
}
