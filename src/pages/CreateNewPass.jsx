import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import "./login.css";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { RiLockPasswordLine } from "react-icons/ri";

const CreateNewPass = ({ onClose }) => {
  const{newPassword, newPasswordError, newPasswordSuccess,
  updateNewPassword, saveNewPassword} = useContext(AuthContext);

  
  const handleSave =  () => {
    if(newPassword.password === '' )
    { 
      return console.log("newPasswordError"); 
      if(newPassword.password === newPassword.confirmPassword )
      {
        return console.log("Trung Pass");

      }
      else {
        return console.log("newPasswordError");
        
      }
    }
    

       console.log("newPasswordSuccess");
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
            Save
          </button>
          {/* </Link> */}
        </div>
        
      </div>
    </div>
  );
};

export default CreateNewPass;
