import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./login.css"; 

const Login = () => {
  const {
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);


  return (
    
    <Form onSubmit={loginUser} className="login-form">
      {/* <div className=""> */}
      <Row className="login-container">
        <Col xs="6">
          <Stack gap={3}>
            <h2>Login</h2>
            <p>Hey, Enter your details to get sign in to your account</p>
            <Form.Control
            className="username-input"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            
            <Form.Control
            className="username-input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
              <Link to="/" className="forget_pass">
              Forget Password?
          </Link> 
            <Button variant="primary" type="submit" className="login">
              {isLoginLoading ? "Getting you in..." : "Login"}
             
            </Button>
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError?.message}</p>
              </Alert>
            )}
            <div className="title-register">
            <p>Don't have an account? </p>
            <Link to="/" className="register">Register</Link>
            
            </div>
          </Stack>
        </Col>
      </Row>
      {/* </div> */}
    </Form>
  );
};

export default Login;
