import { useStaticQuery, graphql } from "gatsby";

export default function useError404Settings() {
  // return useStaticQuery(graphql`
  //   query Error404Settings {
  //     wp {
  //       optionsfor404 {
  //         error404 {
  //           errordescription
  //           errorsummary
  //           errortitle
  //         }
  //       }
  //     }
  //   }
  // `).wp.optionsfor404.error404;
}
