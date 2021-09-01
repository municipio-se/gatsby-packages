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
  const data =
    useStaticQuery(graphql`
      query WPNodesForMiniSearch_Municipio {
        pages: graphQlQuery(name: { eq: "WPPagesForMiniSearch" }) {
          data
        }
        posts: graphQlQuery(name: { eq: "WPPostsForMiniSearch" }) {
          data
        }
      }
    `).graphQlQuery?.data?.contentNodes?.nodes || [];

  return [
    data.pages.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
    })),
    data.posts.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes,
    })),
  ];
}
