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

const setHistory = (payload) => {
  return {
    type: "setHistory",
    payload: payload,
  };
}

export { setLogin, setLogout, setRegister, setHistory };
