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
  const data = useStaticQuery(graphql`
    query SearchDocumentsForMiniSearch_Municipio {
      wp {
        pages: contentNodes(first: 10000, where: { contentTypes: [PAGE] }) {
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
        posts: contentNodes(first: 10000, where: { contentTypes: [POST] }) {
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
      }
    }
  `);

  return [
    data.wp.pages.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
    })),
    data.wp.posts.nodes.map((source) => ({
      ...defaultContentNodeFields(source),
      tags: source.tags?.nodes,
    })),
  ];
}
