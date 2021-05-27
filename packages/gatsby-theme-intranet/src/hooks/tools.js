import { useStaticQuery, graphql } from "gatsby";

export default function useTools() {
  return (
    useStaticQuery(graphql`
      query Tools {
        wp {
          sidebar {
            optionsUserTools {
              tools {
                url
                label
              }
            }
          }
        }
      }
    `).wp.sidebar.optionsUserTools?.tools?.map((tool, index) => {
      return {
        id: `tool-${index}`,
        label: tool.label,
        url: tool.url,
      };
    }) || []
  );
}

export function useTool(location) {
  return useTools();
}
