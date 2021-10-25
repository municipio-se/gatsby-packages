import { H, Section } from "@jfrk/react-heading-levels";
import {
  Image,
  PageContent,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
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

  return (
    <article>
      <H>{title}</H>
      <Section>
        <div>
          Published: <Time date={dateGmt} />
        </div>
        {!!featuredImage?.node && <Image {...featuredImage.node} />}

        <PageContent input={contentHTML} contentMedia={contentMedia}>
          {({ preamble, content }) => (
            <>
              {!!preamble && <div>{preamble}</div>}
              {content}
            </>
          )}
        </PageContent>
        <ModularityArea area={contentArea} />
      </Section>
    </article>
  );
}
