import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
import WPBlocks from "@whitespace/gatsby-theme-wordpress-basic/src/components/WPBlocks";
import {
  useHTMLProcessor,
  usePageContext,
} from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import clsx from "clsx";
import React from "react";

import ModularityArea from "./ModularityArea";

// import * as defaultStyles from "./ArticleBody.module.css";

ArticleBody.propTypes = {};

export default function ArticleBody({
  // styles = defaultStyles,
  styles = {},
  ...restProps
}) {
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
