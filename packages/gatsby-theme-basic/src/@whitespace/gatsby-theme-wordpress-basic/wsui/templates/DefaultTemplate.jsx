/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageContent,
  PageHeading,
  PagePreamble,
  PageBreadcrumbs,
  PageFeaturedImage,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
} from "@wsui/base";
import { omit } from "lodash/fp";
import { Fragment } from "react";

import PageBottomSidebarModules from "../../../../wsui/components/PageBottomSidebarModules.jsx";
import PageContentAreaBottomModules from "../../../../wsui/components/PageContentAreaBottomModules.jsx";
import PageContentAreaModules from "../../../../wsui/components/PageContentAreaModules.jsx";
import PageRightSidebarModules from "../../../../wsui/components/PageRightSidebarModules.jsx";
import PageTopSidebarModules from "../../../../wsui/components/PageTopSidebarModules.jsx";
import usePageModules from "../../../../wsui/usePageModules.js";

export default function DefaultTemplate(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "DefaultTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let {
    defaultColspan = 7,
    hideTitle = null,
    contentSpacing = [5, 10],
  } = omit(["spacing"], props);
  const { title, content, isFrontPage, pageAppearance } = usePageContext();

  hideTitle ??= pageAppearance?.hideTitle ?? false;

  let hasSidebar =
    usePageModules("rightSidebar", { ignoreBackgrounds: true })?.length > 0;
  let hasTopSidebarModules =
    usePageModules("topSidebar", { ignoreBackgrounds: true })?.length > 0;
  let hasContentAreaModules =
    usePageModules("contentArea", { ignoreBackgrounds: true })?.length > 0;
  let hasContentAreaBottomModules =
    usePageModules("contentAreaBottom", { ignoreBackgrounds: true })?.length >
    0;

  return (
    <article>
      <Seo title={title} isFrontPage={isFrontPage} />

      {hasTopSidebarModules ? (
        <Section>
          <PageTopSidebarModules />
        </Section>
      ) : (
        <PageBreadcrumbs />
      )}

      {hasSidebar
        ? !!(
            content ||
            !hideTitle ||
            hasContentAreaModules ||
            hasContentAreaBottomModules
          ) && (
            <PageSection background="transparent">
              <PageGrid>
                <PageGridItem colspan={defaultColspan}>
                  <div
                    css={css`
                      ${theme.styleUtils.negateMarginStart}
                      ${theme.styleUtils.negateMarginEnd}
                    `}
                  >
                    {!!(content || !hideTitle) && (
                      <PageSection
                        background="transparent"
                        spacing={contentSpacing}
                      >
                        <PageHeading marginAfter hideTitle={hideTitle} />
                        {/* <PageChildNavigation /> */}
                        <PageFeaturedImage />
                        <Section>
                          {/* <PageChildNavigation /> */}
                          <PageFeaturedImage />
                          <PagePreamble marginAfter />
                          <PageContent />
                        </Section>
                      </PageSection>
                    )}
                    <Section>
                      <PageContentAreaModules
                        ignoreBackgrounds
                        maxColspan={defaultColspan}
                        gap={contentSpacing}
                      />
                      {/* <footer className={styles.footer}>
                        <PageMeta />
                        <PageGrid css={css``}>
                          <PageGridItem>
                            <PageSiblingNavigation />
                          </PageGridItem>
                        </PageGrid>
                      </footer> */}
                      <PageContentAreaBottomModules
                        ignoreBackgrounds
                        gap={contentSpacing}
                      />
                    </Section>
                  </div>
                </PageGridItem>
                <PageGridItem colspan={5}>
                  <Section>
                    <PageRightSidebarModules
                      ignoreBackgrounds
                      gap={contentSpacing}
                      css={css`
                        ${theme.styleUtils.negateMarginStart}
                        ${theme.styleUtils.negateMarginEnd}
                      `}
                    />
                  </Section>
                </PageGridItem>
              </PageGrid>
            </PageSection>
          )
        : !!(
            content ||
            !hideTitle ||
            hasContentAreaModules ||
            hasContentAreaBottomModules
          ) && (
            <Fragment>
              {!!(content || !hideTitle) && (
                <PageSection background="transparent">
                  <PageGrid>
                    <PageGridItem colspan={defaultColspan}>
                      <PageHeading marginAfter hideTitle={hideTitle} />
                      {/* <PageChildNavigation /> */}
                      <PageFeaturedImage />
                      <Section>
                        {/* <PageChildNavigation /> */}
                        <PageFeaturedImage />
                        <PagePreamble marginAfter />
                        <PageContent />
                      </Section>
                    </PageGridItem>
                  </PageGrid>
                </PageSection>
              )}
              <Section>
                <PageContentAreaModules maxColspan={defaultColspan} />
                {/* <footer className={styles.footer}>
                  <PageMeta />
                  <PageGrid css={css``}>
                    <PageGridItem>
                      <PageSiblingNavigation />
                    </PageGridItem>
                  </PageGrid>
                </footer> */}
                <PageContentAreaBottomModules />
              </Section>
            </Fragment>
          )}

      <Section>
        <PageBottomSidebarModules />
      </Section>
    </article>
  );
}
