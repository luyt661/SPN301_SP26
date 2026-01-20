import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const { login } = useLogin();

  return <LoginForm onSubmit={login} />;
}

export default Login;
