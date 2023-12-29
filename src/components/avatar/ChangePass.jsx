import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import "./Profile.css";
import { ChatContext } from "../../context/ChatContext";
import { RiLockPasswordLine } from "react-icons/ri";
import bcrypt from "bcryptjs";

const ChangePass = ({ onClose }) => {
  const { user, token } = useContext(AuthContext);
  const { changeInfo } = useContext(ChatContext);
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorChangePass, setErrorChangePass] = useState(false);
  const [successChangePass, setSuccessChangePass] = useState(false);

  const handleInputChange = (e) => {
    const { password, value } = e.target;
    setChangePass({
      ...changePass,
      [password]: value,
    });
  };

  const handleSave = async () => {
    const { oldPassword, newPassword, confirmPassword } = changePass;

    if (newPassword !== confirmPassword) {
      setErrorChangePass(true);
      return;
    }

    try {
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      changeInfo(user?._id, hashedNewPassword, null, token, oldPassword);
      setErrorChangePass(false);
      setSuccessChangePass(true);
    } catch (error) {
      setErrorChangePass(true);
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
        <form className="old-password">
          <input
            type="password"
            name="oldPassword"
            value={changePass.oldPassword}
            onChange={handleInputChange}
            placeholder="Old Password"
          />
        </form>
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
        {errorChangePass && <div>Password change failed</div>}
        {!errorChangePass && successChangePass && (
          <div>Password changed successfully</div>
        )}
      </div>
    </div>
  );
};

export default ChangePass;
