import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

function Login({ onLogin }) {
  const { login } = useLogin(onLogin);

  return <LoginForm onSubmit={login} />;
}

export default Login;
