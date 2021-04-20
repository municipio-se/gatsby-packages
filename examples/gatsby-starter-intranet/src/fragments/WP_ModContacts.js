import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModContacts on WP_ModContacts {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    kontakter {
      compactMode
      contacts {
        ... on WP_ModContacts_Kontakter_Contacts_Custom {
          address
          administrationUnit
          email
          firstName
          image {
            ...WP_ImageThumbnail
          }
          workTitle
          visitingAddress
          other
          openingHours
          lastName
          socialMedia {
            media
            url
            fieldGroupName
          }
          phoneNumbers {
            number
            type
            fieldGroupName
          }
        }
      }
      displayMode
      displaySettings
    }
  }
`;
