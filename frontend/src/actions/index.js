const setLogin = (payload) => {
    return {
        type: "setLogin",
        payload: payload,
      };
    
};

const setLogout = (payload) => {
  return {
    type: "setLogout",
    payload: {isLogged: false},
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

const setProfile = (payload) => {
  return {
    type: "setProfile",
    payload: payload
  }
}

const setDashboard =(payload) => {
  return {
    type: "setDashboard",
    payload: payload
  }
}
export { setLogin, setLogout, setRegister, setHistory, setProfile, setDashboard };
