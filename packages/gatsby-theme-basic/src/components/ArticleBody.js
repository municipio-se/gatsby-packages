import * as defaultStyles from "@whitespace/gatsby-theme-wordpress-basic/src/components/ArticleBody.module.css";
import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
import WPBlocks from "@whitespace/gatsby-theme-wordpress-basic/src/components/WPBlocks";
import {
  useHTMLProcessor,
  usePageContext,
} from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import ModularityArea from "./ModularityArea";

ArticleBody.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleBody({ styles = defaultStyles, ...restProps }) {
  let {
    contentNode: {
      blocksJSON,
      content: contentHTML,
      contentArea,
      contentMedia,
    },
  } = usePageContext();

  const { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(contentHTML, { contentMedia });

  return (
    <TextContent {...restProps}>
      {blocksJSON ? (
        <>
          <WPBlocks
            blocks={JSON.parse(blocksJSON)}
            contentMedia={contentMedia}
          />
        </>
      ) : (
        <>
          {preamble && <div className={clsx(styles.preamble)}>{preamble}</div>}
          {content}
          <ModularityArea area={contentArea} />
        </>
      )}
    </TextContent>
  );
}
