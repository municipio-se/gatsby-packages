import formatDate from "date-fns/format";
import parseDate from "date-fns/parseJSON";
import { graphql, useStaticQuery } from "gatsby";

function htmlToText(html) {
  return html && html.replace(/(<([^>]+)>)/gi, "");
}

function defaultContentNodeFields(source) {
  return {
    id: source.id,
    url: source.url || source.uri,
    contentType: source.contentType?.node.name,
    label: source.title,
    date: source.dateGmt,
    year: source.dateGmt && formatDate(parseDate(source.dateGmt), "yyyy"),
    month: source.dateGmt && formatDate(parseDate(source.dateGmt), "yyyy-MM"),
    image: source.featuredImage?.node,
    text: [
      // Post content
      htmlToText(source.content),
      // Modularity modules
      source.contentArea?.modules.map(({ node: module }) => [
        // Module title if not hidden
        !module?.hideTitle && module?.title,
        // Module content (in text modules etc)
        htmlToText(module?.content),
        // Manual input in Posts module
        module?.dataSource?.data?.map((data) => [
          data.postTitle,
          htmlToText(data.postContent),
        ]),
      ]),
    ],
  };
}

export default function useSearchDocuments() {
  const {
    graphQlQuery: { data },
  } = useStaticQuery(graphql`
    query WPNodesForMiniSearch_Municipio {
      graphQlQuery(name: { eq: "WPContentNodesForMiniSearch" }) {
        data
      }
    }
  `);

  return [
    data.contentNodes.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes?.map((tag) => tag?.name),
    })),
  ];
}
