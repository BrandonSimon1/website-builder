import { gql } from "@apollo/client";

export default gql`
  query GetTheme {
    ... on GridContainer {
      id
      type
      contentOrientation
      gridPosition
      background
      href
      parent {
        id
      }
    }
    ... on ContentContainer {
      id
      type
      contentOrientation
      gridPosition
      background
      href
      parent {
        id
      }
    }
    ... on TextField {
      id
      type
      textStyle
      href
      text
      parent {
        id
      }
    }
    ... on ImageField {
      id
      type
      href
      src
      parent {
        id
      }
    }
  }
`;
