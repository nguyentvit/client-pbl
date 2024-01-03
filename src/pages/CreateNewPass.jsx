import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import "../components/avatar/Profile.css";
import { ChatContext } from "../context/ChatContext";
import { RiLockPasswordLine } from "react-icons/ri";


const CreateNewPass = ({ onClose }) => {
  const { user, token } = useContext(AuthContext);
  const { changeInfo } = useContext(ChatContext);
  const [changePass, setChangePass] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errorChangePass, setErrorChangePass] = useState(false);
  const [successChangePass, setSuccessChangePass] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChangePass({
      ...changePass,
      [name]: value,
    });
  };
  // const bcrypt = require("bcrypt");

  const handleSave = async () => {
    const {  newPassword, confirmPassword } = changePass;
  
    try {
      
      if (newPassword !== confirmPassword) {
        setErrorChangePass('New password and confirm password do not match');
        return;
      }
  
      // Nếu không có lỗi, thực hiện thay đổi mật khẩu
      changeInfo(user?._id, null, null, token, newPassword);
      setErrorChangePass(false);
      setSuccessChangePass(true);
    } catch (error) {
      setErrorChangePass('An error occurred while changing password');
    }
  };
  
  
  
  const close = () => {
    setSuccessChangePass(false);
    onClose();
  };


  return (
    <div className="modal">
      
      <div className="modal-content">
     
        <IoCloseCircle className="button-close" onClick={close} />
        <div className="change-title">
          <div className="icon-lock">
          <RiLockPasswordLine className="iconlock"/>
          </div>
        <h5>Change PassWord</h5>
        <div className="title-low">Update password for enhanced account security</div>
        <hr className="divider-title" />
      </div>
      <div className="profile-infor">
        
        <form className="new-password">
          <input
            type="password"
            name="newPassword"
            value={changePass.newPassword}
            onChange={handleInputChange}
            placeholder="New Password"
          />
        </form>
        <form className="confirm-password">
          <input
            type="password"
            name="confirmPassword"
            value={changePass.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
        </form>
        <button onClick={handleSave} className="btn-save">
            Save
          </button>
        </div>
        {errorChangePass && <div className="error-title" style={{marginLeft: "40px", color: "red", marginTop: "-18px", fontSize: "15px", width: "350px"}}> {errorChangePass}</div>}
        {!errorChangePass && successChangePass && (
          <div className="success-title" style={{marginLeft: "90px", color: "red", marginTop: "-18px", fontSize: "15px"}}>Password changed successfully</div>
        )}
      </div>
    </div>
  );
};

export default CreateNewPass;
