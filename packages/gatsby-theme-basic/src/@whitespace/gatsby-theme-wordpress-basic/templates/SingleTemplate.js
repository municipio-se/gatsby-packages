import { H, Section } from "@jfrk/react-heading-levels";
import {
  Image,
  Time,
  WPBlocks,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

import { ModularityArea } from "../../../components";

export default function SingleTemplate({ pageContext }) {
  const {
    contentNode: {
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

  return (
    <article>
      <H>{title}</H>
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
      </Section>
    </article>
  );
}
