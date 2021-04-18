import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./TableModule.module.css";

export default function TableModule({
  styles = defaultStyles,
  className,
  tableData,
  ...restProps
}) {
  let { title, items, displayAlternatives, textSize } = tableData;

  return (
    <div className={clsx(styles.component, className)}>
      <table {...restProps}>
        {title && <caption>{title}</caption>}

        <thead>
          <tr>
            {items[0].map((title, index) => {
              return (
                <th scope="col" key={index}>
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.slice(1).map((item, index) => {
            return (
              <tr key={index}>
                {item.map((data, index) => {
                  return <td key={index}>{data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
