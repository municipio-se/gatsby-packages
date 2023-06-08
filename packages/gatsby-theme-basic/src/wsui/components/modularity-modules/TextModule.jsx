import { Html } from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { useThemeProps } from "@wsui/base";
import { TextModule as WsuiTextModule } from "@wsui/municipio";
import React, { useContext } from "react";

import modularityAreaContext from "../../../modularityAreaContext";
import modularityModuleContext from "../../../modularityModuleContext";
import modularityRowContext from "../../../modularityRowContext";

export default function TextModule(props) {
  props = useThemeProps({ props, name: "MunicipioTextModule" });
  let {
    module: {
      modTextOptions: {
        hideBoxFrame = false,
        theme: color,
        link,
        icon,
        displayMode,
        backgroundImage,
      },
      content,
      contentMedia,
      contentModularityModules,
      title,
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

  const textContent = (
    <Html
      contentMedia={contentMedia}
      contentModularityModules={contentModularityModules}
      semanticHeadings
    >
      {content}
    </Html>
  );

  // if (!theme?.includes(".")) {
  //   theme = [theme, 100];
  // }

  return (
    <WsuiTextModule
      color={(!hideBoxFrame && color && [100, color]) || undefined}
      title={title}
      content={textContent}
      link={link}
      icon={icon}
      displayMode={displayMode}
      align={align}
      backgroundImage={backgroundImage}
      {...restProps}
    />
  );
}
