import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
import { editorThemeObjectTypes } from "./EditorComponents";
import { Tree } from "./Tree";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function Editor() {
  const { loading, error, data } = useQuery(GetTheme);
  // const [updateThemeObject] = useMutation(UpdateThemeObject);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("data", data);

  return (
    <DndProvider backend={HTML5Backend}>
      <Tree
        flatTree={data?.getTheme ?? []}
        themeObjectTypes={editorThemeObjectTypes}
      />
    </DndProvider>
  );
}

export default Editor;
