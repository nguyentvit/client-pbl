import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./login.css"; 
import Loginimg from "../img/home2.png";
const Login = () => {
  const {
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);

  console.log(loginError);

  return (
    
    <Form onSubmit={loginUser} className="login-form">
      {/* <div className=""> */}
      <img src={Loginimg } alt="" style={{width :"400px" , height: "400px", marginRight: "140px", marginTop: "30px"}}/>
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
            <Link to="/forgetpass" className="forget_pass">
            Forget Password?
                </Link>
            
            <Button variant="primary" type="submit" className="login">
              {isLoginLoading ? "Getting you in..." : "Login"}
            
            </Button>
            {loginError?.response?.error === true && 
              <div className="login_error">
                {loginError?.message}
              </div>}
            <div className="title-register">
            <p>Don't have an account? </p>
            <Link to="/register" className="register">Register</Link>
            
            </div>
          </Stack>
        </Col>
      </Row>
      {/* </div> */}
    </Form>
  );
};

export default Login;
