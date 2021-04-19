import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModTable on WP_ModTable {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    tableEditor {
      modTableClasses
      modTableDataType
      modTableSize
      modTable
      modTableCsvFile {
        id
      }
      modTableCsvDelimiter
    }
  }
`;
