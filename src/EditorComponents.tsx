import React from "react";
import { useDrag } from "react-dnd";
import { themeObjectTypes as base, themeObjectTypes } from "./BaseComponents";

const EditorComponent = ({ type, C, ...props }: any) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type, id: props.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  return isDragging ? (
    <C ref={preview} {...props} />
  ) : (
    <C ref={drag} {...props} />
  );
};

export const editorThemeObjectTypes = Object.entries(base).reduce(
  (a, [type, C]) => ({
    ...a,
    [type]: (props: any) => <EditorComponent {...props} type={type} C={C} />
  }),
  {}
);

export const EditorContainer = (props) => {
  const [_, drop] = useDrop(() => ({
    accept: "GridContainer"
  }));
  const { GridContainer } = themeObjectTypes;
  return <GridContainer ref={drop} {...props} />;
};
