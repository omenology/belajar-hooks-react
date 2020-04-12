import React, { useContext } from "react";

import Card from "./UI/Card";
import "./Auth.css";
import { AuthContex } from "./contex/Auth-cntex";

const Auth = props => {
  const authContex = useContext(AuthContex);
  const loginHandler = () => {
    authContex.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
