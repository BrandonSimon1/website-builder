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

function Tree({ flatTree }) {
  const top = flatTree.find((o) => !o.parent);
  function R({ nested, extraStyles }) {
    const C = themeObjectTypes[nested.type];
    const children = flatTree.filter(
      (o) => o.parent && o.parent.id == nested.id
    );
    if (nested.type == "GridContainer") {
      const style = {
        ...nested.gridPosition,
        background: nested.background,
        ...extraStyles
      };
      return (
        <C {...{ style }} href={nested.href}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else if (nested.type == "ContentContainer") {
      const style = {
        ...nested.contentOrientation,
        background: nested.background,
        ...extraStyles
      };
      return (
        <C {...{ style }} href={nested.href}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else if (nested.type == "TextField") {
      const style = {
        ...nested.textStyle,
        ...extraStyles
      };
      return (
        <C {...{ style }} href={nested.href}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else if (nested.type == "ImageField") {
      const style = {
        ...extraStyles
      };
      return (
        <C {...{ style }} href={nested.href} src={nested.src}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else {
      return null;
    }
  }
  return (
    <R nested={top} extraStyles={{ minHeight: "100vh", width: "100vw" }} />
  );
}

function App() {
  const { loading, error, data } = useQuery(GetTheme);
  // const [updateThemeObject] = useMutation(UpdateThemeObject);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("data", data);
  return <Tree flatTree={data?.getTheme ?? []} />;
}

export default App;
