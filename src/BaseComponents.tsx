import React from "react";

const LinkOrDiv = (baseStyle: any) => ({
  href,
  children,
  style,
  ...props
}: any) =>
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

export const themeObjectTypes: { [type: string]: React.FC<any> } = {
  GridContainer,
  ContentContainer,
  TextField
};
