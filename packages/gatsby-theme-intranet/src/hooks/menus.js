import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import { getPage } from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import { useStaticQuery, graphql } from "gatsby";

export default function useMenus() {
  let pages = usePages();
  return useStaticQuery(graphql`
    query WP_Menus_2 {
      wp {
        menus {
          nodes {
            menuItems {
              nodes {
                connectedObject {
                  ... on WP_Page {
                    id
                    contentType {
                      node {
                        name
                      }
                    }
                  }
                }
                cssClasses
                label
                description
                url
                target
              }
            }
            locations
          }
        }
      }
    }
  `).wp.menus.nodes.map((menu) => ({
    ...menu,
    items: menu.menuItems.nodes.map((menuItem) => {
      let { connectedObject, cssClasses, label, description, url, target } =
        menuItem;
      let { contentType: { node: { name: type = "custom" } = {} } = {}, id } =
        connectedObject || {};
      let content = type === "page" ? getPage(pages, id) : {};
      return {
        type,
        url,
        icon: cssClasses[0],
        target: connectedObject && connectedObject.id ? target : "_blank",
        ...content,
        label,
        description: description || (content && content.description),
      };
    }),
  }));
}

export function getMenu(menus, location) {
  const menu = menus.find((menu) => menu?.locations?.indexOf(location) >= 0);

  return menu || [];
}

export function useMenu(location) {
  return getMenu(useMenus(), location);
}
