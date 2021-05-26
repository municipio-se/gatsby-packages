import { css } from "@emotion/react";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import Card from "../Card";
import Grid from "../Grid";
import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./ColorBlocksModule.module.css";

export default function ColorBlocksModule({
  styles = defaultStyles,
  components: { Item = Card } = { Item: Card },
  className,
  module,
  title,
  ...restProps
}) {
  const {
    colorBlocks: { blocks: items, display: displaySettings },
  } = module;

  const { processContent, stripHTML } = useHTMLProcessor();

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Grid className={clsx(styles.list)}>
        {items.map(({ themeColor, post, page, excerpt }, index) => {
          const item = post ? { ...post } : { ...page };

          return (
            <Item
              key={index}
              styles={styles}
              className={clsx(styles.item)}
              css={css({
                "--item-background": `var(--color-theme-${themeColor}-background)`,
                "--item-foreground": `var(--color-theme-${themeColor}-foreground)`,
              })}
              url={item.uri}
              title={displaySettings.includes("title") && item.title}
              date={displaySettings.includes("date") && item.dateGmt}
              dateFormat={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
              description={
                !!(displaySettings.includes("excerpt") && excerpt) && excerpt
              }
            />
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}
