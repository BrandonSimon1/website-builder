import { gql } from "@apollo/client";

export default gql`
  query getTheme {
    getTheme {
      ... on GridContainer {
        id
        type
        gridPosition {
          gridRowEnd
          gridRowStart
          gridColumnEnd
          gridColumnStart
        }
        background
        href
        parent {
          ... on GridContainer {
            id
          }
          ... on ContentContainer {
            id
          }
        }
      }
      ... on ContentContainer {
        id
        type
        contentOrientation {
          flexDirection
          justifyContent
          alignItems
        }
        gridPosition {
          gridRowEnd
          gridRowStart
          gridColumnEnd
          gridColumnStart
        }
        background
        href
        parent {
          ... on GridContainer {
            id
          }
          ... on ContentContainer {
            id
          }
        }
      }
      ... on TextField {
        id
        type
        textStyle {
          fontFamily
          fontWeight
          color
          textAlign
        }
        href
        text
        parent {
          ... on GridContainer {
            id
          }
          ... on ContentContainer {
            id
          }
        }
      }
      ... on ImageField {
        id
        type
        href
        src
        parent {
          ... on GridContainer {
            id
          }
          ... on ContentContainer {
            id
          }
        }
      }
    }
  }
`;
