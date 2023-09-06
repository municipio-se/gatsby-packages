import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { useThemeProps } from "@wsui/base";
import { TextModule as WsuiTextModule } from "@wsui/municipio";
import React, { useContext } from "react";

import modularityModuleContext from "../../../modularityModuleContext";

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
      link, // TODO: Remove this since it's no longer used
      icon,
      displayMode, // TODO: Remove this since it's no longer used
      backgroundImage, // TODO: Remove this since it's no longer used
      links,
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

  let { align } = useContext(modularityModuleContext);

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
      links={links}
      {...restProps}
    />
  );
}
