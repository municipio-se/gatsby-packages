import { H, Section } from "@jfrk/react-heading-levels";
import {
  Image,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

import { ModularityArea } from "../components";

export default function SingleTemplate({ pageContext }) {
  const {
    contentNode: {
      // databaseId,
      title,
      dateGmt,
      featuredImage,
      content: contentHTML,
      contentMedia,
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
        {!!featuredImage?.node && <Image {...featuredImage.node} />}
        {!!preamble && <div>{preamble}</div>}
        {content}
        <ModularityArea area="content-area" {...contentArea} />
      </Section>
    </article>
  );
}
