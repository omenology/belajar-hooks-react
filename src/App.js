import React, { useContext } from "react";
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContex } from "./components/contex/Auth-cntex";
import "./App.css";

function App() {
  const authContex = useContext(AuthContex);

  let content = <Auth />;
  if (authContex.isAuth) {
    content = <Ingredients />;
  }
  return content;
}

export default App;
