import { useContext } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import "./login.css";
import ResetPass from "../img/resetpass.jpg";
const Forgetpass = () => {
  const {
    resetError,
    isResetLoading,
    updateResetInfo,
    resetPassword,
    resetInfo,
    resetSuccess,
  } = useContext(AuthContext);

  const handleReset = async (e) => {
    e.preventDefault();
    resetPassword(resetInfo);
  };
  return (
    <Form onSubmit={handleReset} className="login-form">
      {/* <div className=""> */}
      <img
        src={ResetPass}
        alt=""
        style={{
          width: "600px",
          height: "650px",
          marginRight: "140px",
          marginTop: "-40px",
        }}
      />
      <Row className="login-container">
        <Col xs="6">
          <Stack gap={3}>
            <h2>Reset Password</h2>
            <p>Hey, Enter your details to get sign in to your account</p>
            <Form.Control
              className="username-input"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateResetInfo({ ...resetInfo, email: e.target.value })
              }
            />

            <Button variant="primary" type="submit" className="login">
              {isResetLoading ? "Getting you in..." : "Reset"}
            </Button>
            {resetError?.response?.error === true && (
              <div className="login_error">{resetError?.message}</div>
            )}
            {resetSuccess && (
              <div
                className="login_error"
                style={{ marginLeft: "-75px", width: "450px" }}
              >
                Please check your email for change your password.
              </div>
            )}
          </Stack>
        </Col>
      </Row>
      {/* </div> */}
    </Form>
  );
};

export default Forgetpass;
