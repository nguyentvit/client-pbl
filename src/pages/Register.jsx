import { useContext } from "react";
import "./login.css";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Loginimg from "../img/register.jpg";
import VerifyEmailNotification from './VerifyRegister';
const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    registerSuccess,
  } = useContext(AuthContext);

  const handleRegister = () => {
    console.log(registerInfo);
  }
  return (
    <>
      <Form onSubmit={registerUser} className="login-form">
        <img
          src={Loginimg}
          alt=""
          style={{
            width: "550px",
            height: "350px",
            marginRight: "50px",
            marginTop: "30px",
          }}
        />

        <Row className="login-container">
          <Col xs="6">
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                className="username-input"
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                className="username-input"
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                className="username-input"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit" className="login">
                {isRegisterLoading ? "Creating your account" : "Register"}
              </Button>
              
              {registerError?.response?.error === true && 
              <div className="register_error">
                {registerError?.message}
                </div>}
            </Stack>
          </Col>
        </Row>
      </Form>
      {registerSuccess && <VerifyEmailNotification />}
    </>
  );
};

export default Register;
