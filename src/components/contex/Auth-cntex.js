import React, { useState } from "react";

export const AuthContex = React.createContext({
  isAuth: false,
  login: () => {}
});

const AuthContexProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);

  const loginHandler = () => {
    setAuthenticated(true);
  };
  return <AuthContex.Provider value={{ isAuth: authenticated, login: loginHandler }}>{props.children}</AuthContex.Provider>;
};

export default AuthContexProvider;
