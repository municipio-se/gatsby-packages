/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import {
  PageHeading,
  PageBreadcrumbs,
  Seo,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import ContentTypeArchive from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components/algolia/ContentTypeArchive.jsx";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
} from "@wsui/base";
import { graphql } from "gatsby";
import { omit } from "lodash/fp";
import { Fragment } from "react";

import ModularityArea from "../../../../wsui/components/ModularityArea.jsx";
import makeModuleSections from "../../../../wsui/makeModuleSections";

export default function ContentTypeTemplate(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "ContentTypeTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let {
    defaultColspan = 7,
    hideTitle = false,
    contentSpacing = [5, 10],
    data,
  } = omit(["spacing"], props);
  const { title, contentType } = usePageContext();

  let {
    rightSidebar,
    topSidebar,
    bottomSidebar,
    contentArea,
    contentAreaBottom,
  } = data?.wp?.contentType || {};

  let rightSidebarModules = makeModuleSections(rightSidebar?.modules);
  let hasSidebar = rightSidebarModules?.length > 0;

  let topSidebarModules = makeModuleSections(topSidebar?.modules);

  let bottomSidebarModules = makeModuleSections(bottomSidebar?.modules);

  let contentAreaModules = makeModuleSections(contentArea?.modules, {
    ignoreBackgrounds: hasSidebar,
  });
  let contentAreaBottomModules = makeModuleSections(
    contentAreaBottom?.modules,
    { ignoreBackgrounds: hasSidebar },
  );

  let hasTopSidebarModules = topSidebarModules?.length > 0;
  // let hasContentAreaModules = contentAreaModules?.length > 0;
  // let hasContentAreaBottomModules = contentAreaBottomModules?.length > 0;

  return (
    <article>
      <Seo title={title} isFrontPage={false} />

      {hasTopSidebarModules ? (
        <Section>
          <ModularityArea moduleRows={topSidebarModules} />
        </Section>
      ) : (
        <PageBreadcrumbs />
      )}

      {hasSidebar ? (
        <PageSection background="transparent">
          <PageGrid>
            <PageGridItem colspan={defaultColspan}>
              <div
                css={css`
                  ${theme.styleUtils.negateMarginStart}
                  ${theme.styleUtils.negateMarginEnd}
                `}
              >
                <PageSection background="transparent" spacing={contentSpacing}>
                  <PageHeading marginAfter hideTitle={hideTitle} />
                  <ContentTypeArchive contentType={contentType} />
                </PageSection>
                <Section>
                  <ModularityArea
                    moduleRows={contentAreaModules}
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
                  <ModularityArea
                    moduleRows={contentAreaBottomModules}
                    gap={contentSpacing}
                  />
                </Section>
              </div>
            </PageGridItem>
            <PageGridItem colspan={5}>
              <Section>
                <ModularityArea
                  moduleRows={rightSidebarModules}
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
      ) : (
        <Fragment>
          <PageSection background="transparent">
            <PageGrid>
              <PageGridItem colspan={defaultColspan}>
                <PageHeading marginAfter hideTitle={hideTitle} />
                <ContentTypeArchive contentType={contentType} />
              </PageGridItem>
            </PageGrid>
          </PageSection>
          <Section>
            <ModularityArea
              moduleRows={contentAreaModules}
              maxColspan={defaultColspan}
            />
            {/* <footer className={styles.footer}>
                  <PageMeta />
                  <PageGrid css={css``}>
                    <PageGridItem>
                      <PageSiblingNavigation />
                    </PageGridItem>
                  </PageGrid>
                </footer> */}
            <ModularityArea moduleRows={contentAreaBottomModules} />
          </Section>
        </Fragment>
      )}

      <Section>
        <ModularityArea moduleRows={bottomSidebarModules} />
      </Section>
    </article>
  );
}

export const query = graphql`
  query ContentTypeTemplateQuery($contentTypeName: ID!) {
    wp {
      contentType(id: $contentTypeName, idType: NAME) {
        ...WP_ContentTypeModularityAreas
      }
    }
  }
`;
