import { gql } from "@apollo/client";
import fakeTheme from "./fake-theme";

export const resolvers = {
  ThemeObject: {
    __resolveType(o) {
      switch (o.type) {
        case "GridContainer":
          return "GridContainer";
        case "ContentContainer":
          return "ContentContainer";
        case "TextField":
          return "TextField";
        case "ImageField":
          return "ImageField";
        default:
          return;
      }
    }
  },
  Container: {
    __resolveType(o) {
      switch (o.type) {
        case "GridContainer":
          return "GridContainer";
        case "ContentContainer":
          return "ContentContainer";
        default:
          return;
      }
    }
  },
  Field: {
    __resolveType(o) {
      switch (o.type) {
        case "TextField":
          return "TextField";
        case "ImageField":
          return "ImageField";
        default:
          return;
      }
    }
  },
  Query: {
    getTheme() {
      return fakeTheme;
    }
  }
};

export const typeDefs = gql`
  union Container = GridContainer | ContentContainer
  union Field = TextField | ImageField
  union ThemeObject = GridContainer | ContentContainer | TextField | ImageField

  enum ThemeObjectType {
    GridContainer
    ContentContainer
    TextField
    ImageField
  }

  type GridContainer {
    id: ID!
    type: ThemeObjectType!
    gridPosition: GridPosition!
    background: String!
    href: String
    parent: Container
  }

  type GridPosition {
    gridRowStart: String!
    gridRowEnd: String!
    gridColumnStart: String!
    gridColumnEnd: String!
  }

  type ContentContainer {
    id: ID!
    type: ThemeObjectType!
    contentOrientation: ContentOrientation!
    gridPosition: GridPosition!
    background: String!
    href: String
    parent: Container
  }

  type ContentOrientation {
    flexDirection: String!
    justifyContent: String!
    alignItems: String!
  }

  type TextField {
    id: ID!
    type: ThemeObjectType!
    textStyle: TextStyle!
    href: String
    text: String!
    parent: Container
  }

  type ImageField {
    id: ID!
    type: ThemeObjectType!
    href: String
    src: String!
    parent: Container
  }

  type TextStyle {
    fontFamily: String!
    fontWeight: String!
    color: String!
    textAlign: String!
  }

  type Query {
    getTheme: [ThemeObject]
  }

  type Mutation {
    updateThemeObject(id: Int!): ThemeObject
  }
`;
