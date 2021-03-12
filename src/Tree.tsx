import React from "react";

export function Tree({ flatTree, themeObjectTypes, Container }) {
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
        <C {...{ style }} href={nested.href} id={nested.id}>
          {children.map((c) => (
            <R key={c.id} nested={c} />
          ))}
        </C>
      );
    } else if (nested.type == "ContentContainer") {
      const style = {
        ...nested.contentOrientation,
        ...nested.gridPosition,
        background: nested.background
      };
      return (
        <C {...{ style }} id={nested.id} href={nested.href}>
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
        <C {...{ style }} id={nested.id} href={nested.href}>
          {nested.text}
        </C>
      );
    } else if (nested.type == "ImageField") {
      const style = {};
      return (
        <C {...{ style }} id={nested.id} href={nested.href} src={nested.src} />
      );
    } else {
      return null;
    }
  }
  return (
    <Container style={{ minHeight: "100vh", minWidth: "100vw" }}>
      {highest.map((c) => (
        <R nested={c} key={c.id} />
      ))}
    </Container>
  );
}
