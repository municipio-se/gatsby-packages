import { H, Section } from "@jfrk/react-heading-levels";
import { ModularityArea } from "@municipio/gatsby-theme-basic/src/components/ModularityArea";
import {
  Image,
  Time,
  WPBlocks,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import React, { useEffect } from "react";


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

  const [, setPageContext] = usePageContext();
  useEffect(() => {
    setPageContext(pageContext);
  }, [pageContext]);

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
            <ModularityArea area="content-area" {...contentArea} />
          </>
        )}
      </Section>
    </article>
  );
}
