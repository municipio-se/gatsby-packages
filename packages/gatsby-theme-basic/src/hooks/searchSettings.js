import { useStaticQuery, graphql } from "gatsby";

export default function useSearchSettings() {
  return useStaticQuery(graphql`
    query SearchSettings {
      wp {
        ...WP_SearchSettingsForHook
      }
    }
  `).wp.acfOptionsSearch;
}
