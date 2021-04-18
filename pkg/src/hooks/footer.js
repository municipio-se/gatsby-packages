import { useStaticQuery, graphql } from "gatsby";

export default function useFooterBlocks() {
  // return useStaticQuery(graphql`
  //   query FooterBlocks {
  //     wp {
  //       footer {
  //         footerBlocks {
  //           blocks {
  //             ... on WP_Footer_Footerblocks_Blocks_TextBlock {
  //               fieldGroupName
  //               textBlockContent
  //               textBlockTitle
  //             }
  //             ... on WP_Footer_Footerblocks_Blocks_ContactBlock {
  //               fieldGroupName
  //               contactBlockAddress
  //               contactBlockEmail
  //               contactBlockMoreLink {
  //                 ... on WP_Page {
  //                   uri
  //                   title
  //                 }
  //                 ... on WP_Post {
  //                   uri
  //                   title
  //                 }
  //               }
  //               contactBlockPhone
  //               contactBlockShowMore
  //               contactBlockTitle
  //             }
  //             ... on WP_Footer_Footerblocks_Blocks_LinksBlock {
  //               fieldGroupName
  //               linksBlockTitle
  //               linksBlockDisplay
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).wp.footer.footerBlocks.blocks;
}
