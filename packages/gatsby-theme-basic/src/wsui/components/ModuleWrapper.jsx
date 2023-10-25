import { useTheme } from "@emotion/react";
import {
  H,
  Heading,
  Section,
  TypographyBlock,
  generateUniqueId,
  withDefaultProps,
} from "@wsui/base";
import React, { useState } from "react";

export default function ModuleWrapper({
  as: Component = "div",
  children,
  components: { ModuleWrapperHeader = "div", ModuleWrapperTitle = H } = {
    ModuleWrapperHeader: "div",
    ModuleWrapperTitle: withDefaultProps(Heading, {
      marginBefore: false,
      marginAfter: true,
    }),
  },
  title,
  description,
  headingVariant,
  headingId,
  ...restProps
}) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const MaybeSection = title ? Section : React.Fragment;

  const [defaltHeadingId] = useState(
    () => `module-heading-${generateUniqueId()}`,
  );
  headingId = headingId || defaltHeadingId;

  return (
    <Component {...restProps}>
      {!!title && (
        <ModuleWrapperHeader>
          {typeof title === "function" ? (
            title({ H, Heading, variant: headingVariant, id: headingId })
          ) : (
            <ModuleWrapperTitle variant={headingVariant} id={headingId}>
              {title}
            </ModuleWrapperTitle>
          )}
        </ModuleWrapperHeader>
      )}
      <MaybeSection>
        {description && (
          <TypographyBlock marginAfter>{description}</TypographyBlock>
        )}
        {children}
      </MaybeSection>
    </Component>
  );
}
