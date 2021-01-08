import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
import UpdateThemeObject from "./UpdateThemeObject.mutation";

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

const textFieldBaseStyles = {
  display: "block"
};

const TextField = LinkOrDiv(textFieldBaseStyles);

function App() {
  const { loading, error, data } = useQuery(GetTheme);
  const [updateThemeObject] = useMutation(UpdateThemeObject);

  return <div>Hello</div>;
}

export default App;
