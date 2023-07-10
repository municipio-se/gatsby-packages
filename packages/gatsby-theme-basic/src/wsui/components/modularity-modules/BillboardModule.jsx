import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { useThemeProps } from "@wsui/base";
import { BillboardModule as WsuiBillboardModule } from "@wsui/municipio";
import React, { useContext } from "react";

// import modularityAreaContext from "../../../modularityAreaContext";
import modularityModuleContext from "../../../modularityModuleContext";
// import modularityRowContext from "../../../modularityRowContext";
import useModularityModule from "../../../useModularityModule";

export default function BillboardModule(props) {
  props = useThemeProps({ props, name: "MunicipioBillboardModule" });
  props = useModularityModule({ props, parseContent: false });
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
    modBillboard: { format, image, links, color },
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
    <WsuiBillboardModule
      color={color || undefined}
      title={hideTitle ? undefined : title}
      content={content}
      links={links}
      format={format}
      align={align}
      image={image}
      {...restProps}
    />
  );
}
