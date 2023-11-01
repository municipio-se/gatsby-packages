/** @jsx jsx */

import { useTheme, css, jsx } from "@emotion/react";
import {
  Icon,
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
  titleIcon,
  titleIconProps = { size: 8 },
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
            <ModuleWrapperTitle
              variant={headingVariant}
              marginAfter
              id={headingId}
              css={css`
                display: flex;
                gap: 0.5em;
                align-items: start;
              `}
            >
              {titleIcon && (
                <Icon
                  name={titleIcon}
                  css={css`
                    align-self: center;
                    flex: none;
                  `}
                  {...titleIconProps}
                />
              )}
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
