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
    const { name, value } = e.target;
    setChangePass({
      ...changePass,
      [name]: value,
    });
  };
  // const bcrypt = require("bcrypt");

  const handleSave = async () => {
    const { oldPassword, newPassword, confirmPassword } = changePass;
  
    try {
      // Truy xuất mật khẩu được lưu trữ trong cơ sở dữ liệu
      // Ở đây giả sử user.password chứa mật khẩu đã được mã hóa trong cơ sở dữ liệu
      // Thực tế, bạn cần truy xuất mật khẩu từ cơ sở dữ liệu
      const hashedPasswordFromDB = user.password;
  
      // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPasswordFromDB);
  
      if (!passwordMatch || newPassword !== confirmPassword) {
        setErrorChangePass(true);
        return;
      }
  
      // Nếu mật khẩu cũ khớp và mật khẩu mới khớp với nhau
      // Tiến hành thay đổi mật khẩu trong cơ sở dữ liệu
      // Và sau đó set các trạng thái Error và Success tùy theo kết quả thực hiện
      changeInfo(user?._id, null, null, token, newPassword);
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
        {errorChangePass && <div className="error-title" style={{marginLeft: "120px", color: "red", marginTop: "-18px", fontSize: "15px"}}>Password change failed</div>}
        {!errorChangePass && successChangePass && (
          <div className="success-title" style={{marginLeft: "90px", color: "red", marginTop: "-18px", fontSize: "15px"}}>Password changed successfully</div>
        )}
      </div>
    </div>
  );
};

export default ChangePass;
