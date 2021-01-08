import { gql } from "@apollo/client";
// interface ThemeObject {
//   type: string
//   style: json
//   children: ThemeObject[]
// }
export default gql`
  union Container = GridContainer | ContentContainer
  union Field = TextField
  union ThemeObject = Container | Field

  enum ThemeObjectType {
    GridContainer
    ContentContainer
    TextField
  }

  type GridContainer {
    id: ID!
    type: ThemeObjectType!
    style: GridContainerStyle!
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
    style: ContentContainerStyle!
    href: String
    children: [Field]!
  }

  type ContentContainerStyle {
    flexDirection: String!
    justifyContent: String!
    alignItems: String!
  }

  type TextField {
    id: ID!
    type: ThemeObjectType!
    style: TextFieldStyle!
    href: String
    text: String!
  }

  type TextFieldStyle {
    fontFamily: String!
    fontWeight: String!
  }

  type Query {
    getTheme: ThemeObject
  }

  type Mutation {
    updateThemeObject(id: Int!): ThemeObject
  }
`;
