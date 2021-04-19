import { useStaticQuery, graphql } from "gatsby";

export default function useThemeSettings() {
  // return useStaticQuery(graphql`
  //   query ThemeSettings {
  //     wp {
  //       themeOptions {
  //         themeLogo {
  //           themeLogo {
  //             sourceUrl
  //           }
  //           themeFooterLogo {
  //             sourceUrl
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).wp.themeOptions.themeLogo;
}
