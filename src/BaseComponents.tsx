import React from "react";
import { GRIDSIZE } from "./constants";

const LinkOrDiv = (baseStyle: any) =>
  React.forwardRef(({ href, children, style, ...props }: any, ref) =>
    href ? (
      <a style={{ ...baseStyle, ...style }} {...props} ref={ref} href={href}>
        {children}
      </a>
    ) : (
      <div style={{ ...baseStyle, ...style }} ref={ref} {...props}>
        {children}
      </div>
    )
  );

const gridContainerBaseStyles = {
  display: "grid",
  gridTemplateColumns: `repeat(${GRIDSIZE}, 1fr)`,
  gridAutoRows: `repeat(${GRIDSIZE}, 1fr)`
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
