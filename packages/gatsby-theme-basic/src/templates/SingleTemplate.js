import { H, Section } from "@jfrk/react-heading-levels";
import {
  Image,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import PropTypes from "prop-types";
import React from "react";

import { ModularityArea } from "../components";

SingleTemplate.propTypes = {
  pageContext: PropTypes.shape({
    contentNode: PropTypes.shape({
      content: PropTypes.string,
      contentArea: PropTypes.any,
      contentMedia: PropTypes.arrayOf(PropTypes.object),
      dateGmt: PropTypes.any,
      featuredImage: PropTypes.shape({ node: PropTypes.any }),
      title: PropTypes.node,
    }),
  }),
};

export default function SingleTemplate({ pageContext }) {
  const {
    contentNode: {
      content: contentHTML,
      contentArea,
      contentMedia,
      // databaseId,
      dateGmt,
      featuredImage,
      title,
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
        <ModularityArea area={contentArea} />
      </Section>
    </article>
  );
}
