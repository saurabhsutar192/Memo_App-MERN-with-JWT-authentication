import { createStore } from "redux";

let initialState = {
  isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isLoggedIn: action.payload };
      break;
    default:
      return state;
  }
};

export const store = createStore(reducer);
