import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import avatar from "../../assets/avatar.svg";
import { MdOutlineEdit } from "react-icons/md";
import "./Profile.css";

const EditProfile = ({ onClose }) => {
  const { user } = useContext(AuthContext);

  // State để lưu các thông tin chỉnh sửa
  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    email: user.email,
    // Thêm các trường thông tin cần thiết khác ở đây
  });

  // Xử lý thay đổi giá trị trong trường thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  // Xử lý khi nhấn nút Lưu
  const handleSave = () => {
    // Gửi thông tin chỉnh sửa đến server (cần xử lý logic gửi dữ liệu)
    // Sau khi gửi thành công, có thể đóng form
    // onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <IoCloseCircle className="button-close" onClick={onClose} />
        <div className="avatar-edit">
          <img
            src={avatar}
            style={{ height: "70px", width: "70px", display: "flex", marginLeft: "180px" }}
          />
          <MdOutlineEdit
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "240px",
              marginTop: "-60px",
            }}
          />
        </div>
        <div className="profile-infor">
          <form className="username-update">
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              
            /> </form> 
            <form className="email-update">
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
            />
            </form>
            {/* Thêm các trường thông tin khác cần chỉnh sửa */}
         </div>
          <button onClick={handleSave} className="btn-save">Save</button>
       
      </div>
    </div>
  );
};

export default EditProfile;
