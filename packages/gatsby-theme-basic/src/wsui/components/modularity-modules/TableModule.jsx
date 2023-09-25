import Html from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components/Html.jsx";
import {
  Table as DefaultTable,
  useThemeProps,
  handleComponentsProp,
} from "@wsui/base";
import React from "react";

import ModuleWrapper from "../ModuleWrapper.jsx";

export default function TableModule(props) {
  props = useThemeProps({ props, name: "TableModule" });
  let { module = {}, title, components, ...restProps } = props;
  components = handleComponentsProp(components, { Table: DefaultTable });
  const { Table } = components;
  const { modTableOptions: { modTable } = {} } = module;
  let rows;

  try {
    rows = JSON.parse(modTable);
  } catch {
    // Do nothing
  }

  if (!rows?.length) {
    return null;
  }

  // Handle formatting in the table cells
  rows = rows.map((itemArr) => {
    const formattedSubItems = itemArr.map((subItem, index) => (
      <Html key={index}>{subItem}</Html>
    ));
    return formattedSubItems;
  });

  // The first row is the header
  let [fields, ...items] = rows;

  // We use the column index as the name for each field since the items are arrays
  fields = fields.map((field, index) => ({
    name: String(index),
    label: field,
  }));

  return (
    <ModuleWrapper title={title} {...restProps}>
      <Table fields={fields} items={items} />
    </ModuleWrapper>
  );
}
