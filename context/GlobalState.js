import React, { createContext, Component } from "react";

export const GlobalContext = createContext();

function GlobalState(props) {
  const [loginData, setLoginData] = React.useState({ isLogin: false });
  const [photos, setPhotos] = React.useState([]);
  function appendPhoto(photo) {
    setPhotos([...photos, photo]);
  }
  return (
    <GlobalContext.Provider
      value={{
        loginData: loginData,
        setLoginData: setLoginData,
        photos: photos,
        appendPhoto: appendPhoto,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
