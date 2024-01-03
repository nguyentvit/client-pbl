import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import "./login.css";
import { Link, useParams } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { RiLockPasswordLine } from "react-icons/ri";

const CreateNewPass = ({ onClose }) => {
  const{newPassword, newPasswordError, newPasswordSuccess,
  updateNewPassword, saveNewPassword, newPasswordLoading} = useContext(AuthContext);
  const {token} = useParams();

  
  const handleSave =  () => {
    if (newPassword.password === "") {
      return console.log("loi toe");
    }
    if (newPassword.password !== newPassword.confirmPassword) {
      return console.log("deo trung");
    }
    saveNewPassword(newPassword.password, token);
  };
  
  
  
 


  return (
    <div className="modal">
      
      <div className="modal-content">
     
        {/* <IoCloseCircle className="button-close" onClick={close} /> */}
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
        
            onChange={(e) =>{updateNewPassword({...newPassword, password: e.target.value});}}
            placeholder="New Password"
          />
        </form>
        <form className="confirm-password">
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) =>{updateNewPassword({...newPassword, confirmPassword: e.target.value});}}
            placeholder="Confirm Password"
          />
        </form>
        {/* <Link to="/login" > */}
        <button onClick={handleSave} className="btn-save">
            {!newPasswordLoading ? "Save": "Loading"}
          </button>
          {/* </Link> */}
          {newPasswordSuccess && 
          <div>
            Thay đổi mật khẩu thành công
            </div>}
        </div>
        
      </div>
    </div>
  );
};

export default CreateNewPass;
