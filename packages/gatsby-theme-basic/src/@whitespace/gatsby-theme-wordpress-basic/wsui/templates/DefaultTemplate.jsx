/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageContent,
  PageHeading,
  PagePreamble,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import {
  // PageChildNavigation,
  PageContentAreaModules,
  // PageFeaturedImage,
  // PageSiblingNavigation,
} from "../../../../wsui/components";

export default function DefaultTemplate(props) {
  props = useThemeProps({ props, name: "DefaultTemplate" });
  const { title } = usePageContext();
  return (
    <article css={css``}>
      <Seo title={title} />

      {/* Featured image */}
      {/* <PageFeaturedImage /> */}

      <PageGrid
        css={css`
          padding-block: 2rem;
        `}
      >
        <PageGridItem maxColspan={7}>
          <PageHeading css={css``} marginAfter />
          <Section>
            {/* <PageChildNavigation /> */}
            <PagePreamble css={css``} marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
      <PageContentAreaModules maxColspan={7} css={css``} />
      <Section>
        {/* <footer className={styles.footer}>
          <PageMeta />
          <PageGrid css={css``}>
            <PageGridItem>
              <PageSiblingNavigation />
            </PageGridItem>
          </PageGrid>
        </footer> */}
      </Section>
    </article>
  );
}
