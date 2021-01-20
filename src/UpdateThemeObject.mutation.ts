import { gql } from "@apollo/client";

export default gql`
  mutation UpdateThemeObject($id: Int!) {
    updateThemeObject(id: $id) {
      id
    }
  }
`;
