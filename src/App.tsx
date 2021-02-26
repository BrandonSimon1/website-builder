import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
// import UpdateThemeObject from "./UpdateThemeObject.mutation";

const LinkOrDiv = (baseStyle) => ({ href, children, style, ...props }) =>
  href ? (
    <a style={{ ...baseStyle, ...style }} {...props} href={href}>
      {children}
    </a>
  ) : (
    <div style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </div>
  );

const gridContainerBaseStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoRows: "10%"
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
  const highest = flatTree.filter((o) => !o.parent);
  function R({ nested }) {
    const C = themeObjectTypes[nested.type];
    const children = flatTree.filter(
      (o) => o.parent && o.parent.id == nested.id
    );
    if (nested.type == "GridContainer") {
      const style = {
        ...nested.gridPosition,
        background: nested.background
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
        background: nested.background
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
        ...nested.textStyle
      };
      return (
        <C {...{ style }} href={nested.href}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else if (nested.type == "ImageField") {
      const style = {};
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
    <GridContainer style={{ minHeight: "100vh", minWidth: "100vw" }}>
      {highest.map((c) => (
        <R nested={c} key={c.id} />
      ))}
    </GridContainer>
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
