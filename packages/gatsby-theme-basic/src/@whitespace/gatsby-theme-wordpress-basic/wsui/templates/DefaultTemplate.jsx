/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageContent,
  PageHeading,
  PagePreamble,
  PageBreadcrumbs,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { Section, PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import {
  // PageChildNavigation,
  PageContentAreaModules,
  // PageFeaturedImage,
  // PageSiblingNavigation,
} from "../../../../wsui/components";

export default function DefaultTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "DefaultTemplate" });
  let { spacing } = props;
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} />

      <PageGrid>
        <PageGridItem colspan={12}>
          <PageBreadcrumbs
            css={css`
              margin-top: ${theme.getLength(-4)};
              margin-bottom: ${theme.getLength(8)};
            `}
          />
        </PageGridItem>
      </PageGrid>

      {/* Featured image */}
      {/* <PageFeaturedImage /> */}

      <PageGrid>
        <PageGridItem maxColspan={7}>
          <PageHeading marginAfter />
          <Section>
            {/* <PageChildNavigation /> */}
            <PagePreamble marginAfter />
            <PageContent marginAfter />
          </Section>
        </PageGridItem>
      </PageGrid>
      <Section>
        <PageContentAreaModules maxColspan={7} spacing={spacing} marginAfter />
        {/* <footer className={styles.footer}>
          <PageMeta />
          <PageGrid>
            <PageGridItem>
              <PageSiblingNavigation />
            </PageGridItem>
          </PageGrid>
        </footer> */}
      </Section>
    </article>
  );
}
