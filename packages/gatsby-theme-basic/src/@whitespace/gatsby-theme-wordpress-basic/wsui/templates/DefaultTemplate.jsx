/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageContent,
  PageHeading,
  PagePreamble,
  PageBreadcrumbs,
  PageFeaturedImage,
  PageFooter as DefaultPageFooter,
  PageBottom as DefaultPageBottom,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
  handleComponentsProp,
  OutlineNav,
} from "@wsui/base";
import { omit } from "lodash/fp";
import { Fragment, useState } from "react";

import PageBottomSidebarModules from "../../../../wsui/components/PageBottomSidebarModules.jsx";
import PageContentAreaBottomModules from "../../../../wsui/components/PageContentAreaBottomModules.jsx";
import PageContentAreaModules from "../../../../wsui/components/PageContentAreaModules.jsx";
import PageRightSidebarModules from "../../../../wsui/components/PageRightSidebarModules.jsx";
import PageTopSidebarModules from "../../../../wsui/components/PageTopSidebarModules.jsx";
import usePageModules from "../../../../wsui/usePageModules.js";

export default function DefaultTemplate(props) {
  const theme = useTheme();
  const pageContext = usePageContext();
  const { title, content, isFrontPage, pageAppearance } = pageContext;
  props = useThemeProps({
    props,
    name: "DefaultTemplate",
    context: { pageContext },
  });
  props = useThemeProps({ props, name: "Template", context: { pageContext } });
  let {
    defaultColspan = 7,
    hideTitle = null,
    contentSpacing = [5, 10],
    components,
    showOutlineNav = false,
    footerMargin = 0,
  } = omit(["spacing"], props);
  components = handleComponentsProp(components, {
    PageBottom: DefaultPageBottom,
    PageFooter: DefaultPageFooter,
  });
  let {
    PageBottom,
    // PageFooter,
  } = components;
  showOutlineNav = pageContext.pageAppearance?.showOutlineNav ?? showOutlineNav;
  const [mainElement, setMainElement] = useState(null);

  let hasSidebar =
    usePageModules("rightSidebar", { ignoreBackgrounds: true })?.length > 0;
  let topSidebarModules = usePageModules("topSidebar");
  let bottomSidebarModules = usePageModules("bottomSidebar");
  let hasTopSidebarModules = topSidebarModules?.length > 0;
  let hasBottomSidebarModules = bottomSidebarModules?.length > 0;
  let hasContentAreaModules =
    usePageModules("contentArea", { ignoreBackgrounds: true })?.length > 0;
  let hasContentAreaBottomModules =
    usePageModules("contentAreaBottom", { ignoreBackgrounds: true })?.length >
    0;
  let hasMainContent = !!content || !!hasSidebar || !!hasContentAreaModules;

  hideTitle ??= pageAppearance?.hideTitle ?? hasTopSidebarModules;

  const ownerState = {
    hasSidebar,
    hasTopSidebarModules,
    hasContentAreaModules,
    hasContentAreaBottomModules,
    hasBottomSidebarModules,
    hasMainContent,
    hideTitle,
    defaultColspan,
  };

  return (
    <article
      ref={(el) => setMainElement(el)}
      css={css`
        padding-bottom: ${!hasBottomSidebarModules && footerMargin
          ? theme.getLength(footerMargin)
          : null};
      `}
    >
      <Seo title={title} isFrontPage={isFrontPage} />

      <PageBreadcrumbs background={topSidebarModules?.[0]?.background} />

      {showOutlineNav && (
        <PageSection
          background="transparent"
          css={css`
            position: sticky;
            top: 0.5rem;
            z-index: 1;
          `}
        >
          <PageGrid>
            <PageGridItem colspan={defaultColspan}>
              <Section>
                <OutlineNav
                  source={mainElement}
                  css={css`
                    margin-block-end: 2rem;
                  `}
                />
              </Section>
            </PageGridItem>
          </PageGrid>
        </PageSection>
      )}

      <Section>
        <PageTopSidebarModules promoteFirstHeading={hideTitle} />
      </Section>

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
                        <PageFeaturedImage />
                        <Section>
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
                      {/* {hasMainContent && (
                        <PageSection
                          background="transparent"
                          spacing={contentSpacing}
                        >
                          <PageFooter />
                        </PageSection>
                      )} */}
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
                      <PageFeaturedImage />
                      <Section>
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
                {/* {hasMainContent && (
                  <PageSection background="transparent">
                    <PageGrid>
                      <PageGridItem colspan={defaultColspan}>
                        <PageFooter />
                      </PageGridItem>
                    </PageGrid>
                  </PageSection>
                )} */}
                <PageContentAreaBottomModules />
              </Section>
            </Fragment>
          )}

      <Section>
        <PageBottomSidebarModules />
        <PageBottom ownerState={ownerState} />
      </Section>
    </article>
  );
}
