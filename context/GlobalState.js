import React, { createContext, Component } from "react";

export const GlobalContext = createContext();


function GlobalState(props) {
  const [loginData, setLoginData] = React.useState({ isLogin: false });
  return (
    <GlobalContext.Provider
      value={{ loginData: loginData, setLoginData: setLoginData }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalState
