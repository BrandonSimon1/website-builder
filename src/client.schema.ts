import { gql } from "@apollo/client";
// interface ThemeObject {
//   type: string
//   style: json
//   children: ThemeObject[]
// }
export default gql`
  union Container = GridContainer | ContentContainer
  union Field = TextField | ImageField
  union ThemeObject = Container | Field

  enum ThemeObjectType {
    GridContainer
    ContentContainer
    TextField
  }

  type GridContainer {
    id: ID!
    type: ThemeObjectType!
    gridPosition: GridPosition!
    background: String!
    href: String
    children: [ThemeObject]!
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
    children: [Field]!
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
  }

  type ImageField {
    id: ID!
    type: ThemeObjectType!
    href: String
    src: String!
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
