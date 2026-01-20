import { useNavigate } from "react-router-dom";

export function useLogin(onLogin) {
  const navigate = useNavigate();

  const login = async (state, dispatch) => {
    // ✅ Validate rỗng ở đây
    let fieldErrors = {
      username: "",
      password: "",
      general: "",
    };

    if (!state.username.trim()) {
      fieldErrors.username = "Username không được để trống";
    }

    if (!state.password.trim()) {
      fieldErrors.password = "Password không được để trống";
    }

    if (fieldErrors.username || fieldErrors.password) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: fieldErrors,
      });
      return;
    }

    dispatch({ type: "LOGIN_START" });

    await new Promise((r) => setTimeout(r, 800));

    if (state.username === "Admin" && state.password === "123456") {
      dispatch({ type: "LOGIN_SUCCESS" });
      onLogin();
      navigate("/");
    } else {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          username: "",
          password: "",
          general: "Sai username hoặc password!",
        },
      });
    }
  };

  return { login };
}
