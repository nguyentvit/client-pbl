import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./login.css"; 
import ResetPass from "../img/resetpass.jpg";
const Forgetpass = () => {
  const {
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);


  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleReset = async (e) => {
    e.preventDefault();
    await resetUser(e);
    if (!resetError) {
      // Nếu không có lỗi khi đăng ký, hiển thị thông báo thành công
      setShowSuccessMessage(true);
    }
  };
  return (
    
    <Form onSubmit={loginUser} className="login-form">
      {/* <div className=""> */}
      <img src={ResetPass } alt="" style={{width :"600px" , height: "650px", marginRight: "140px", marginTop: "-40px"}}/>
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
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            
            <Form.Control
            className="username-input"
              type="password"
              placeholder="New Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
              <Form.Control
            className="username-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
             
            <Button variant="primary" type="submit" className="login">
              {isLoginLoading ? "Getting you in..." : "Reset"}
             
            </Button>
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError?.message}</p>
              </Alert>
            )}
           
          </Stack>
        </Col>
      </Row>
      {/* </div> */}
    </Form>
  );
};

export default Forgetpass;
