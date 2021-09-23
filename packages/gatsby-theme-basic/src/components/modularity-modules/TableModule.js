import clsx from "clsx";
import PropTypes from "prop-types";
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
  const { modTableOptions: { modTable } = {} } = module;

  const tableData = JSON.parse(modTable);

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <ModuleWrapper
        as={"table"}
        title={title}
        components={{
          // eslint-disable-next-line react/display-name, react/prop-types
          ModuleWrapperHeader: ({ children, className, ...restProps }) => (
            <caption className={clsx(styles.title, className)} {...restProps}>
              {children}
            </caption>
          ),
          ModuleWrapperTitle: "span",
        }}
        className={clsx(styles.table)}
        {...restProps}
      >
        <thead className={clsx(styles.head)}>
          <tr className={clsx(styles.headTr)}>
            {tableData[0].map((title, index) => {
              return (
                <th className={clsx(styles.th)} scope="col" key={index}>
                  {title}
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
