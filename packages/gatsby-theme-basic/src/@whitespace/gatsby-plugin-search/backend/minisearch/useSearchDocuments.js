import formatDate from "date-fns/format";
import parseDate from "date-fns/parseJSON";
import { graphql, useStaticQuery } from "gatsby";
import traverse from "traverse";

import { getMostRelevantDate } from "../../../../utils";

function htmlToText(html) {
  return html && html.replace(/(<([^>]+)>)/gi, "");
}

function extractAllStrings(obj) {
  return traverse(obj)
    .nodes()
    .filter((node) => typeof node === "string" || typeof node === "number")
    .join(" ");
}

function defaultContentNodeFields(source) {
  let contentType = source.contentType?.node.name;
  let dates =
    contentType !== "page"
      ? source.archiveDatesGmt || (source.dateGmt && [source.dateGmt])
      : [];
  let date = getMostRelevantDate(dates);
  return {
    id: source.id,
    url: source.url || source.uri,
    contentType,
    label: source.title,
    dates,
    date,
    year: date && formatDate(parseDate(date), "yyyy"),
    month: date && formatDate(parseDate(date), "yyyy-MM"),
    years: dates && dates.map((date) => formatDate(parseDate(date), "yyyy")),
    months:
      dates && dates.map((date) => formatDate(parseDate(date), "yyyy-MM")),
    publishDate: source.dateGmt,
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
        module?.modPostsDataSource?.data?.map((data) => [
          data.postTitle,
          htmlToText(data.postContent),
        ]),
        // Values in Contacts module
        module?.modContactsOptions?.contacts?.map(extractAllStrings),
        // Text in Notice module
        module?.modNoticeOptions?.noticeText,
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
      tags: source.tags?.nodes?.map((tag) => tag?.slug),
    })),
  ];
}
