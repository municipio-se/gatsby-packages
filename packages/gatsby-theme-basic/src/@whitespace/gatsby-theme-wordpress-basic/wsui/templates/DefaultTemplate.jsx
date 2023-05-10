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

export default function DefaultTemplate(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "DefaultTemplate" });
  let { spacing = [4, 8] } = props;
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} />

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
        <PageContentAreaModules
          maxColspan={7}
          css={css`
            margin-bottom: ${theme.getLength(spacing)};
          `}
        />
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
