import { H, Section } from "@jfrk/react-heading-levels";
import {
  Image,
  Time,
  WPBlocks,
  BoxNavigation,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import {
  usePageChildren,
  usePageSiblings,
} from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/boxNavigation";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import * as styles from "@whitespace/gatsby-theme-wordpress-basic/src/templates/SingleTemplate.module.css";
import React from "react";

import { ModularityArea } from "../../../components";

export default function SingleTemplate({ pageContext }) {
  const {
    contentNode: {
      id,
      title,
      dateGmt,
      featuredImage,
      content: contentHTML,
      contentMedia,
      blocksJSON,
      contentArea,
    },
    // isPreview,
  } = pageContext;

  const { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(contentHTML, { contentMedia });

  const pageChildren = usePageChildren(id);
  const pageSiblings = usePageSiblings(id);

  return (
    <article>
      <H>{title}</H>
      <BoxNavigation className={styles.childPages} items={pageChildren} />
      <Section>
        <div>
          Published: <Time date={dateGmt} />
        </div>
        {!!(featuredImage && featuredImage.node) && (
          <Image {...featuredImage.node} />
        )}
        {blocksJSON ? (
          <WPBlocks
            blocks={JSON.parse(blocksJSON)}
            contentMedia={contentMedia}
          />
        ) : (
          <>
            {!!preamble && <div>{preamble}</div>}
            {content}
            <ModularityArea area={contentArea} />
          </>
        )}
        <BoxNavigation
          className={styles.siblingPages}
          title="Relaterat innehåll"
          items={pageSiblings}
        />
      </Section>
    </article>
  );
}
