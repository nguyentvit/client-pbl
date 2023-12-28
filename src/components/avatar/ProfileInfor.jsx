import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import avatar from "../../assets/avatar.svg";
import { MdOutlineEdit } from "react-icons/md";
import "./Profile.css";

const EditProfile = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setEditedProfile({
          ...editedProfile,
          avatar: reader.result, 
        });
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSave = () => {
    // Xử lý lưu thông tin và ảnh đã chọn
  };

  const handleEditImageClick = () => {
    
    fileInputRef.current.click();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <IoCloseCircle className="button-close" onClick={onClose} />
        <div className="avatar-edit">
          <img src={editedProfile.avatar || avatar} alt="Avatar" />
          <MdOutlineEdit className="edit-img" onClick={handleEditImageClick} />
        </div>
        <div className="profile-infor">
          <form className="username-update">
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
            />
          </form>
          <form className="email-update">
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
            />
          </form>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </div>
        <button onClick={handleSave} className="btn-save">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
