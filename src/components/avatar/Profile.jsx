import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import { TbLogout } from "react-icons/tb";
import { IoIosMail } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import EditProfle from "./ProfileInfor";
import ChangePass from "./ChangePass";
import { ChatContext } from "../../context/ChatContext";
import { RiLockPasswordLine } from "react-icons/ri";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const {userInfo} = useContext(ChatContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setIsChangePassModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openChangePassModal = () => {
    setIsChangePassModalOpen(true);
    setIsEditModalOpen(false);
  };

  const closeChangePassModal = () => {
    setIsChangePassModalOpen(false);
  };
  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
        {user && user.avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            width="20"
            height="20"
            className="user-avatar"
          />
        ) : (
          <img
            width="48"
            height="48"
            src={avatar}
            alt="circled-user-male-skin-type-3--v1"
          />
        )}
      </div>
      <div className="Username">
        {user && (
          <>
            <span className="text-warning"> Hi, {userInfo?.name || user?.name}</span>
          </>
        )}
      </div>
      {isOpen ? (
        <div className="profile-box">
          <div className="profile-context">
            <div className="profile-header">
              <div className="user-avatar">
                <img
                  width="30"
                  height="30"
                  src={avatar}
                  alt="circled-user-male-skin-type-3--v1"
                />
                <h5 className="username-header">{userInfo?.name || user?.name}</h5>
              </div>
              <div className="user-mail">
                <IoIosMail className="mail-icon" />
                <h6>{user?.email}</h6>
              </div>
            </div>
            <hr className="divider" />
           
            <div className="setting-profile">
              <div className="edit-profile">
                <Link className="editProfile" onClick={openEditModal}>
                  <MdOutlineEdit
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                      marginLeft: "5px",
                      color: "rgb(3, 114, 233)"
                    }}
                  />
                  Edit Profile
                </Link>
                {isEditModalOpen && (
                  <div>
                    <EditProfle onClose={closeEditModal} />
                  </div>
                )}
              </div>
              <div className="change-pass">
                <Link className="changePass" onClick={openChangePassModal}>
                <RiLockPasswordLine 
                 style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  marginLeft: "14px",
                  color: "rgb(3, 114, 233)"}}
                />
                  
                  Change Password
                </Link>
                {isChangePassModalOpen && (
                  <div>
                    <ChangePass onClose={closeChangePassModal} />
                  </div>
                )}
              </div>
              <div className="logout-content" >
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="logout"
                  style={{color: "red"}}
                >
                  <TbLogout
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "15px",
                      marginRight: "7px",
                      color: "red"
                    }}
                  />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
