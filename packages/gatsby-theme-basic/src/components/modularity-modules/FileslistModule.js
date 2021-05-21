import { Link } from "@whitespace/components";
import clsx from "clsx";
import formatFileSize from "filesize";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./FileslistModule.module.css";

function getFileExtension(url) {
  try {
    let { pathname } = new URL(url);
    url = pathname;
  } catch {
    // Do nothing
  }
  let [, extension] = url?.match?.(/\.([^.]+)$/) || [];
  return extension;
}

export default function FileslistModule({
  styles = defaultStyles,
  className,
  title,
  ...restProps
}) {
  const {
    files: { fileList },
  } = module;
  if (!fileList?.length) {
    return null;
  }
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <ul className={clsx(styles.list)}>
        {fileList.map((item, index) => {
          if (!item.file) {
            return null;
          }
          const fileType = getFileExtension(item.file.mediaItemUrl);
          const fileSize = formatFileSize(item.file.fileSize, {
            locale: "se",
            round: 0,
            base: 10,
          });
          const title = `${item.file.title} (${fileType}, ${fileSize})`;
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link
                to={item.file.mediaItemUrl}
                download={true}
                type={item.file.mimeType}
                className={clsx(styles.link)}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </ModuleWrapper>
  );
}
