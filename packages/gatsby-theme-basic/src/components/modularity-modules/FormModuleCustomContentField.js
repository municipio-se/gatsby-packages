import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

export default function FormModuleCustomContentField({
  field: {
    content,
    // conditionalLogic,
    // conditonalField,
  },
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();
  return <div {...restProps}>{processContent(content)}</div>;
}
