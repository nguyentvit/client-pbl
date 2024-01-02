import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import avatar from "../../assets/avatar.svg";
import { MdOutlineEdit } from "react-icons/md";
import "./Profile.css";
import { ChatContext } from "../../context/ChatContext";

const EditProfile = ({ onClose }) => {
  const { user, token } = useContext(AuthContext);
  const {changeInfo, userInfo} = useContext(ChatContext);
  const fileInputRef = useRef(null);

  const [editedProfile, setEditedProfile] = useState({
    name: userInfo.name || user.name,
    email: user.email,
    avatar: userInfo.avatar, 
  });
  const [errorChangeInfo, setErrorChangeInfo] = useState(false);
  const [successChangeInfo, setSuccessChangeInfo] = useState(false);

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
    if (editedProfile.name === "") {
      setErrorChangeInfo(true);
    }
    else {
      changeInfo(user?._id, editedProfile.name, editedProfile.avatar, token, null);
      setErrorChangeInfo(false);
      setSuccessChangeInfo(true);
      console.log(user?._id)

    }
  };

  const handleEditImageClick = () => {
    
    fileInputRef.current.click();
  };

  const close = () => {
    setSuccessChangeInfo(false);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <IoCloseCircle className="button-close" onClick={close} />
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
              readOnly
            />
          </form>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
           <button onClick={handleSave} className="btn-save">
          Save
        </button>
        </div>
        {errorChangeInfo && (
          <div>Loi toe</div>
        )}
        {!errorChangeInfo && successChangeInfo && (
          <div  style={{marginLeft: "115px", color: "red", marginTop: "-18px", fontSize: "15px"}}>Change Your Infor Successfully</div>
        )}
       
      </div>
    </div>
  );
};

export default EditProfile;
