const setLogin = (payload) => {
    return {
        type: "setLogin",
        payload: payload,
      };
    
};


const logout = (payload) => {
  return {
    type: "logout",
    payload: payload,
  };
};

const setRegister = (payload) => {
  return {
    type: "setRegister",
    payload: payload,
  };
};

export { setLogin, logout, setRegister };
