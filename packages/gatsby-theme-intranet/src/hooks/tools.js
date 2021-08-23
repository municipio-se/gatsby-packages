import { useStaticQuery, graphql } from "gatsby";

export default function useTools() {
  return (
    useStaticQuery(graphql`
      query Tools {
        wp {
          ...WP_SidebarSettingsForHook
        }
      }
    `).wp.municipioIntranetSidebarSettings?.tools?.tools?.map((tool, index) => {
      return {
        id: `tool-${index}`,
        label: tool.label,
        url: tool.url,
      };
    }) || []
  );
}

export function useTool() {
  return useTools();
}
