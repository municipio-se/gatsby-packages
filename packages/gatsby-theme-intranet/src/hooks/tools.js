import { useStaticQuery, graphql } from "gatsby";

// export default function useTools() {
//   return (
//     useStaticQuery(graphql`
//       query Tools {
//         wp {
//           navigation {
//             optionsUserTools {
//               tools {
//                 url
//                 label
//               }
//             }
//           }
//         }
//       }
//     `).wp.navigation.optionsUserTools?.tools?.map((tool, index) => {
//       return {
//         id: `tool-${index}`,
//         label: tool.label,
//         url: tool.url,
//       };
//     }) || []
//   );
// }

export function useTool(location) {
  // return useTools();
  return [];
}
