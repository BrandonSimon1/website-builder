import React from "react";
import { useDrag } from "react-dnd";
import { themeObjectTypes as base } from "./BaseComponents";

const EditorComponent = (type, C) => (props) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type, id: props.id }
  }));
  return isDragging ? (
    <C ref={preview} {...props} />
  ) : (
    <C ref={drag} {...props} />
  );
};

export const themeObjectTypes = Object.entries(base).reduce(
  (a, [type, C]) => ({ ...a, [type]: EditorComponent(type, C) }),
  {}
);
