import { css, useTheme } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import React from "react";

export default function ModuleWrapper({
  as: Component = "div",
  children,
  components: { ModuleWrapperHeader = "div", ModuleWrapperTitle = H } = {
    ModuleWrapperHeader: "div",
    ModuleWrapperTitle: H,
  },
  title,
  ...restProps
}) {
  const theme = useTheme();
  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component {...restProps}>
      {!!title && (
        <ModuleWrapperHeader>
          {typeof title === "function" ? (
            title({ H })
          ) : (
            <ModuleWrapperTitle
              css={css`
                margin-bottom: ${theme.getLength(7.5)};
              `}
            >
              {title}
            </ModuleWrapperTitle>
          )}
        </ModuleWrapperHeader>
      )}
      <MaybeSection>{children}</MaybeSection>
    </Component>
  );
}
