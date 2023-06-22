/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageContent,
  PageHeading,
  PagePreamble,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { Section, PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import {
  // PageChildNavigation,
  PageContentAreaModules,
  // PageFeaturedImage,
  // PageSiblingNavigation,
} from "../../../../wsui/components";

export default function FrontPageTemplate(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "FrontPageTemplate" });
  let { spacing = [8.75, 17.5], defaultColspan = 7 } = props;
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} isFrontPage />
      <PageGrid
        css={css`
          margin-bottom: ${theme.getLength(spacing)};
        `}
        maxColspan={defaultColspan}
      >
        <PageGridItem>
          <div
            css={css`
              ${theme.styleUtils.negateMarginStart}
              ${theme.styleUtils.negateMarginEnd}
            `}
          >
            <PageHeading hideTitle marginAfter />
            <Section>
              <PagePreamble marginAfter />
              <PageContent />
            </Section>
          </div>
        </PageGridItem>
      </PageGrid>
      <Section>
        <PageContentAreaModules
          maxColspan={defaultColspan}
          css={css`
            margin-bottom: ${theme.getLength(spacing)};
          `}
        />
      </Section>
    </article>
  );
}
