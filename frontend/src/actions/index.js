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

const setInviteList = (payload) =>{
  return {
    type: 'setInviteList',
    payload: payload
  }
}

const setGroupList = (payload) => {
  return {
    type: "setGroupList",
    payload:payload
  }
}

const setGroupPage = (payload) => {
  return {
    type: "setGroupPage",
    payload:payload
  }
}
export { setLogin, setLogout, setRegister, setHistory, setProfile, setDashboard, setInviteList, setGroupList, setGroupPage };
