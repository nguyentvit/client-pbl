// import { useParams } from "react-router-dom";
// import {Button, Col, Row, Stack} from "react-bootstrap"
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// const ResetPassSuccess = () => {
//     const {token} = useParams();
//     const {resetPassword} = useContext(AuthContext);
//     // const [verificationLoading, setVerificationLoading] = useState(false);
//     return ( 
//             <div>
                
//                 <Row className="login-container" style={{marginLeft: "600px", height: "200px", marginTop: "250px"}}>
//                  <Col xs="6">
//           <Stack gap={3}>
//             <h2 style={{marginTop: "-150px", width: "380px", marginLeft: "-80px"}}>Verify Your Account</h2>
//             <Link to="/createnewPass" className="navbar-links-container" style={{marginLeft: "80px"}}>
                   
//                    <Button onClick={() => resetPassword(token)}>Reset Pass</Button></Link>
//                    {/* {verificationLoading && <p>Loading...</p>} */}
//                 </Stack>
//         </Col>
//       </Row>
//             </div>
//      );
// }
 
//  export default ResetPassSuccess;
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import "./login.css";
import { Link, useParams } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

const CreateNewPass = ({ onClose }) => {
  const {
    newPassword,
    newPasswordError,
    setNewPasswordError,
    setNewPasswordSuccess,
    newPasswordSuccess,
    updateNewPassword,
    saveNewPassword,
    newPasswordLoading,
  } = useContext(AuthContext);
  const { token } = useParams();

  const handleSave = () => {
    if (newPassword.password === "") {
      setNewPasswordError('Input password'); 
      return;
    }
    if (newPassword.password !== newPassword.confirmPassword) {
      setNewPasswordError('Confirm password does not match'); 
      return;
    }
    setNewPasswordError(false);
    saveNewPassword(newPassword.password, token);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <IoCloseCircle className="button-close" onClick={close} /> */}
        <div className="change-title">
          <div className="icon-lock">
            <RiLockPasswordLine className="iconlock" />
          </div>
          <h5>Change PassWord</h5>
          <div className="title-low">
            Update password for enhanced account security
          </div>
          <hr className="divider-title" />
        </div>
        <div className="profile-infor">
          <form className="new-password">
            <input
              type="password"
              name="newPassword"
              onChange={(e) => {
                updateNewPassword({ ...newPassword, password: e.target.value });
              }}
              placeholder="New Password"
            />
          </form>
          <form className="confirm-password">
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => {
                updateNewPassword({
                  ...newPassword,
                  confirmPassword: e.target.value,
                });
              }}
              placeholder="Confirm Password"
            />
          </form>
          {/* <Link to="/login" > */}
          <button onClick={handleSave} className="btn-save">
            {!newPasswordLoading ? "Save" : "Loading"}
          </button>
          { newPasswordError && <div className="error-title" style={{marginLeft: "40px", color: "red", marginTop: "-18px", fontSize: "15px", width: "350px"}}> { newPasswordError}</div>}
       
          {newPasswordSuccess && <div>Thay đổi mật khẩu thành công</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateNewPass;
