import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { useThemeProps } from "@wsui/base";
import { TextModule as WsuiTextModule } from "@wsui/municipio";
import React, { useContext } from "react";

import modularityAreaContext from "../../../modularityAreaContext";
import modularityModuleContext from "../../../modularityModuleContext";
import modularityRowContext from "../../../modularityRowContext";

export default function TextModule(props) {
  props = useThemeProps({ props, name: "MunicipioTextModule" });
  let {
    // eslint-disable-next-line no-unused-vars
    title: ignoredTitle,
    // eslint-disable-next-line no-unused-vars
    description,
    module,
    ...restProps
  } = props;

  let {
    title,
    hideTitle,
    modTextOptions: {
      hideBoxFrame = false,
      theme: color,
      link,
      icon,
      displayMode,
      backgroundImage,
    },
  } = module;

  const { processPageContent } = useHTMLProcessor();
  // TODO: Deprecate `modDescription` in favor of `content`
  let { content } = processPageContent(module.content, {
    extractHeading: false,
    leavePreamble: true,
    contentMedia: module.contentMedia,
    contentModularityModules: module.contentModularityModules,
    semanticHeadings: true,
  });

  const { centerLonelyModules } = useContext(modularityAreaContext);
  const { modules } = useContext(modularityRowContext);
  let { align } = useContext(modularityModuleContext);

  align =
    align || (centerLonelyModules && modules.length === 1)
      ? "center"
      : undefined;

  return (
    <WsuiTextModule
      color={(!hideBoxFrame && color) || undefined}
      title={hideTitle ? undefined : title}
      content={content}
      link={link}
      icon={icon}
      displayMode={displayMode}
      align={align}
      backgroundImage={backgroundImage}
      {...restProps}
    />
  );
}
