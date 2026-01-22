// src/stores/login/loginReducer.js

export const initialLoginState = {
  username: "",
  password: "",
  loading: false,
  errors: {
    username: "",
    password: "",
    general: "",
  },
};

export function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
        errors: { ...state.errors, username: "", general: "" },
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        errors: { ...state.errors, password: "", general: "" },
      };

    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        errors: { username: "", password: "", general: "" },
      };

    case "LOGIN_SUCCESS":
      return { ...state, loading: false };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        errors: action.payload, // { username, password, general }
      };

    case "RESET":
      return { ...initialLoginState };

    default:
      return state;
  }
}
