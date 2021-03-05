import React from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import GetTheme from "./GetTheme.query";
import { useDrag, useDrop } from "react-dnd";
import { }



function App() {
  const { loading, error, data } = useQuery(GetTheme);
  const {} = useDrop();
  // const [updateThemeObject] = useMutation(UpdateThemeObject);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("data", data);
  return <Tree flatTree={data?.getTheme ?? []} />;
}

export default App;
