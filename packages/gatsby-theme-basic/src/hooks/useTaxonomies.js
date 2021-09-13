export default function useTaxonomies(taxonomies, postType) {
  const taxonomyParams = {
    post: "/nyheter/?contentType=post&",
  };

  const taxonomyName = {
    tags: "tags",
  };

  return (
    Object.values(taxonomies)?.map((item) => {
      return {
        name: item.name,
        url: `${taxonomyParams[postType]}${
          taxonomyName[item.taxonomy.node.name]
        }=${item.slug}`,
      };
    }) || {}
  );
}
