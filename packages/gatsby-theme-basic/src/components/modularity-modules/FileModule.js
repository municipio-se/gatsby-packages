import { Link } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import formatFileSize from "filesize";
import React from "react";

import SectionHeader from "../SectionHeader";

import * as defaultStyles from "./FileModule.module.css";

export default function FileModule({
  styles = defaultStyles,
  className,
  files,
  title,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <SectionHeader title={title} />
      <ul>
        {files.map((item, index) => {
          if (!item.file) {
            return null;
          }
          const mimeType = item.file.mimeType.split("/")[1].toUpperCase();
          const fileSize = formatFileSize(item.file.fileSize, {
            locale: "se",
            round: 0,
          });
          const title = `${item.file.title} (${mimeType}, ${fileSize})`;
          return (
            <li key={index}>
              <Link to={item.file.mediaItemUrl}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
