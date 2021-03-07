const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      // newState = action.payload;
    //   Object.assign({}, state, state);
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        Fname: null,
        phoneNumber: null,
        isLogged: true,
      };
    case "logout":
      return {
        ...state,
        isLogged: false,
      };
    case "register":
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          Fname: action.payload.Fname,
          phoneNumber: action.payload.phoneNumber,
          isLogged: true,
        };
    default:
      return state;
  }
};

export default userReducer;
