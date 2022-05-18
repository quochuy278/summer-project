import React, { useState } from "react";

const AuthContext = React.createContext({
  userInfo: {},
  storeUserInfo: () => {},
});

export const AuthContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState();

  const storeUserInfoHandler = (userData) => {
    setUserInfo(userData);
  };

  const contextValue = {
    userInfo: userInfo,
    storeUserInfo: storeUserInfoHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
