import { useReducer } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import {
  loginReducer,
  initialLoginState,
} from "../stores/login/loginReducer";

function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state, dispatch); // ❗ Gửi hết ra ngoài
  };

  return (
    <Container className="py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Login</h2>

      {state.errors.general && (
        <Alert variant="danger">{state.errors.general}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={state.username}
            onChange={(e) =>
              dispatch({
                type: "SET_USERNAME",
                payload: e.target.value,
              })
            }
            isInvalid={!!state.errors.username}
          />
          {state.errors.username && (
            <Form.Text className="text-danger">
              {state.errors.username}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "SET_PASSWORD",
                payload: e.target.value,
              })
            }
            isInvalid={!!state.errors.password}
          />
          {state.errors.password && (
            <Form.Text className="text-danger">
              {state.errors.password}
            </Form.Text>
          )}
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            type="submit"
            variant="success"
            className="w-100"
            disabled={state.loading}
          >
            {state.loading ? (
              <>
                <Spinner size="sm" animation="border" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-100"
            onClick={() => dispatch({ type: "RESET" })}
            disabled={state.loading}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;
