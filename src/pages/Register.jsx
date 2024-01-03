import { useState, useContext } from "react";
import "./login.css";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Loginimg from "../img/register.jpg";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    registerSuccess,
  } = useContext(AuthContext);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(e);
    if (!registerError) {
      // Nếu không có lỗi khi đăng ký, hiển thị thông báo thành công
      setShowSuccessMessage(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleRegister} className="login-form">
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

              {registerError && (
                <div className="register_error">{registerError.message}</div>
              )}

              {registerSuccess && (
                <div
                  className="register_success"
                  style={{ backgroundColor: "", color: "red" }}
                >
                  <p style={{ marginLeft: "-63px", color: "blue" }}>
                    Please check your email for verify your account.
                  </p>
                </div>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
