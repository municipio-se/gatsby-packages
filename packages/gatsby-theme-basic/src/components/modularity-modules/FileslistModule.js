import { Link } from "@whitespace/components";
import clsx from "clsx";
import formatFileSize from "filesize";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./FileslistModule.module.css";

FileslistModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modFileslistOptions: PropTypes.shape({
      fileList: PropTypes.arrayOf(
        PropTypes.shape({
          file: PropTypes.shape({
            fileSize: PropTypes.number,
            mediaItemUrl: PropTypes.string,
            mimeType: PropTypes.string,
            title: PropTypes.node,
          }),
        }),
      ),
    }).isRequired,
  }).isRequired,
};

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
  className,
  module,
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const fileList = module?.modFileslistOptions?.fileList;
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
            locale: language,
            round: 0,
            base: 10,
          });
          const metaData = `${fileType}, ${fileSize}`;
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link
                to={item.file.mediaItemUrl}
                download={true}
                type={item.file.mimeType}
                className={clsx(styles.link)}
              >
                <>
                  <p className={clsx(styles.linkTitle)}>{item.file.title}</p>
                  <p className={clsx(styles.metaData)}>{metaData}</p>
                </>
              </Link>
            </li>
          );
        })}
      </ul>
    </ModuleWrapper>
  );
}
