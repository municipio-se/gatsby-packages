/** @jsx jsx */
import { css, jsx } from "@emotion/react";
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
  props = useThemeProps({ props, name: "FrontPageTemplate" });
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} isFrontPage />
      <PageGrid
        css={css`
          text-align: center;
          padding-block: 2rem;
        `}
      >
        <PageGridItem maxColspan={7}>
          <PageHeading hideTitle css={css``} marginAfter />
          <Section>
            <PagePreamble css={css``} marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
      <Section>
        <PageContentAreaModules maxColspan={7} css={css``} />
      </Section>
    </article>
  );
}
