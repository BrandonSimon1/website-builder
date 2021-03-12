import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
import { editorThemeObjectTypes, EditorContainer } from "./EditorComponents";
import { Tree } from "./Tree";

function Editor() {
  const { loading, error, data } = useQuery(GetTheme);
  // const [updateThemeObject] = useMutation(UpdateThemeObject);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("data", data);

  return (
    <Tree
      flatTree={data?.getTheme ?? []}
      themeObjectTypes={editorThemeObjectTypes}
      Container={EditorContainer}
    />
  );
}

export default Editor;
