import { useTheme } from "@emotion/react";
import {
  H,
  Heading,
  Section,
  TypographyBlock,
  withDefaultProps,
} from "@wsui/base";
import React from "react";

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
  ...restProps
}) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component {...restProps}>
      {!!title && (
        <ModuleWrapperHeader>
          {typeof title === "function" ? (
            title({ H, Heading, variant: headingVariant })
          ) : (
            <ModuleWrapperTitle variant={headingVariant}>
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
