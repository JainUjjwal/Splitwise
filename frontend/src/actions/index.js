const setLogin = (payload) => {
    return {
        type: "setLogin",
        payload: payload,
      };
    
};


const setLogout = (payload) => {
  return {
    type: "setLogout",
    payload: payload,
  };
};

const setRegister = (payload) => {
  return {
    type: "setRegister",
    payload: payload,
  };
};

export { setLogin, setLogout, setRegister };
