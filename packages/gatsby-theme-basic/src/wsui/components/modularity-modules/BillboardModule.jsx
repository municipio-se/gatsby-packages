import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { DevNotice, handleComponentsProp, useThemeProps } from "@wsui/base";
import { CardBillboardModule, FeatureBillboardModule } from "@wsui/municipio";
import { camelCase, upperFirst } from "lodash/fp";
import React, { useContext } from "react";

import modularityModuleContext from "../../../modularityModuleContext";

function defaultComponentMapping({ format, components }) {
  let inferredComponentName = upperFirst(camelCase(format)) + "BillboardModule";
  let Component = components[inferredComponentName];
  return Component;
}

BillboardModuleController.wsuiConfig = {
  leaveHeading: true,
};

export default function BillboardModuleController(props) {
  const { processPageContent } = useHTMLProcessor();
  props = useThemeProps({ props, name: "MunicipioBillboardModuleController" });
  let {
    title,
    module,
    componentMapping = defaultComponentMapping,
    components,
    ...restProps
  } = props;

  components = handleComponentsProp(components, {
    CardBillboardModule,
    FeatureBillboardModule,
  });

  let {
    modBillboard: {
      format,
      image,
      imageAspectRatio,
      imagePlacement,
      links,
      color,
    },
  } = module;

  let { align } = useContext(modularityModuleContext);

  const ownerState = {
    format,
    componentMapping,
    components,
    color,
    links,
    align,
    image,
    ...restProps,
  };

  const Component =
    (typeof componentMapping === "function"
      ? componentMapping(ownerState, defaultComponentMapping)
      : componentMapping[format]) || defaultComponentMapping(ownerState);

  if (!Component) {
    return (
      <DevNotice>
        No component found for billboard module with{" "}
        <code>format={JSON.stringify(format)}</code>
      </DevNotice>
    );
  }

  let { headingContent, headingLevel, content } = processPageContent(
    module.content,
    {
      extractHeading: !Component.wsuiConfig?.hasCaption && !title,
      leavePreamble: true,
      contentMedia: module.contentMedia,
      contentModularityModules: module.contentModularityModules,
      semanticHeadings: true,
    },
  );

  return (
    <Component
      format={format}
      title={headingContent || title}
      titleVariant={headingLevel ? `h${headingLevel}` : undefined}
      content={content}
      align={align}
      image={image}
      imageAspectRatio={imageAspectRatio}
      imagePlacement={imagePlacement}
      links={links}
      color={color || undefined}
      {...restProps}
    />
  );
}
