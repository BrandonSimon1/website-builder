import React from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import GetTheme from "./GetTheme.query";
import { themeObjectTypes } from "./BaseComponents";
import { Tree } from "./Tree";

function App() {
  const { loading, error, data } = useQuery(GetTheme);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("data", data);

  return (
    <Tree flatTree={data?.getTheme ?? []} themeObjectTypes={themeObjectTypes} />
  );
}

export default App;
