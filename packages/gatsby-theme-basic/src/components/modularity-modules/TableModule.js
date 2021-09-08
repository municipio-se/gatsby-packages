import { css } from "@emotion/react";
import clsx from "clsx";
import parseEntities from "parse-entities";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./TableModule.module.css";

TableModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modTableOptions: PropTypes.shape({
      modTable: PropTypes.string,
      modTableCsvDelimiter: PropTypes.string,
      modTableCsvFile: PropTypes.shape({
        id: PropTypes.string,
      }),
      modTableDataType: PropTypes.string,
      theme: PropTypes.string,
    }),
  }),
};

export default function TableModule({
  className,
  module = {},
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    modTableOptions: {
      modTable,
      modTableCsvDelimiter,
      modTableCsvFile,
      modTableDataType: dataType,
      theme,
    } = {},
  } = module;

  const tableData = JSON.parse(modTable);

  return (
    <div
      className={clsx(styles.component, className)}
      css={css({
        "--table-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--table-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--table-border-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
      })}
      {...restProps}
    >
      <ModuleWrapper as={"table"} className={clsx(styles.table)} {...restProps}>
        {title && (
          <caption className={clsx(styles.title, "h4")}>
            {parseEntities(title)}
          </caption>
        )}

        <thead className={clsx(styles.head, "h6")}>
          <tr className={clsx(styles.headTr)}>
            {tableData[0].map((title, index) => {
              return (
                <th className={clsx(styles.th)} scope="col" key={index}>
                  {parseEntities(title)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={clsx(styles.body)}>
          {tableData.slice(1).map((item, index) => {
            return (
              <tr className={clsx(styles.tr)} key={index}>
                {item.map((data, index) => {
                  return (
                    <td className={clsx(styles.td)} key={index}>
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </ModuleWrapper>
    </div>
  );
}
