import { css } from "@emotion/react";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import Card from "../Card";
import Grid from "../Grid";
import CardContent from "../CardContent";
import CardMeta from "../CardMeta";
import CardTitle from "../CardTitle";
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
            css={css({
                 "--card-background": `var(--color-theme-${themeColor}-background)`,
                 "--card-color": `var(--color-theme-${themeColor}-foreground)`,
                 "--card-meta-color": `var(--color-theme-${themeColor}-foreground)`,
               })}
            {...restProps}
          >
            <CardContent>
              {displaySettings.includes("title") && <CardTitle link={ item.uri }>{ item.title}</CardTitle>}
              {displaySettings.includes("date") && (
                <CardMeta>
                  <Time
                    className={clsx(styles.date)}
                    date={item.dateGmt}
                    format={{
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                         }}
                  />
                </CardMeta>
              )}
              {displaySettings.includes("excerpt")  && <p className={clsx(styles.excerpt)}>{excerpt}</p>}
            </CardContent>
          </Item>
          
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}
