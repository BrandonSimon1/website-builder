import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
// import UpdateThemeObject from "./UpdateThemeObject.mutation";

const LinkOrDiv = (baseStyle) => ({ href, children, style, ...props }) =>
  href ? (
    <a style={{ ...baseStyle, style }} {...props} href={href}>
      {children}
    </a>
  ) : (
    <div style={{ ...baseStyle, style }} {...props}>
      {children}
    </div>
  );

const gridContainerBaseStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoRows: "10vh"
};

// styles like background and its own grid position if nested
const GridContainer = LinkOrDiv(gridContainerBaseStyles);

const contentContainerBaseStyles = {
  display: "flex"
};

// styles like background, border, grid position,
const ContentContainer = LinkOrDiv(contentContainerBaseStyles);

const textFieldBaseStyles = {};

const TextField = LinkOrDiv(textFieldBaseStyles);

const themeObjectTypes = {
  GridContainer,
  ContentContainer,
  TextField
};

function renderTree(flatTree) {
  const top = flatTree.find((o) => !o.parent);
  return (function r(nested) {
    const C = themeObjectTypes[nested.type];
    const children = flatTree.filter(
      (o) => o.parent && o.parent.id == nested.id
    );
    return <C>{children.map(r)}</C>;
  })(top);
}

function App() {
  const { loading, error, data } = useQuery(GetTheme);
  // const [updateThemeObject] = useMutation(UpdateThemeObject);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error}</p>;
  console.log(data, "data");
  return (
    <GridContainer style={{ width: "100vw", height: "100vh" }}>
      {renderTree(data?.getTheme ?? [])}
    </GridContainer>
  );
}

export default App;
