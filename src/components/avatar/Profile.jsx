import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { IoIosMail } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import EditProfle from "./ProfileInfor";
// import logoImg from '../img/logo.png';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); // Accessing user and logout function from AuthContext

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
        {user && user.avatar ? (
          <img
            src={avatar} // Assume 'avatar' is the property containing the user's image URL
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
            <span className="text-warning"> Hi, {user?.name}</span>
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
                <h5 className="username-header">{user?.name}</h5>
              </div>
              <div className="user-mail">
                <IoIosMail className="mail-icon" />
                <h6>{user?.email}</h6>
              </div>
            </div>
            <hr className="divider" />
            {/* <Link to="/" className="profile_title">
              <CgProfile
                style={{ width: "30px", height: "25px", marginRight: "30px" }}
              />
              Profile
            </Link> */}
            {/* <br /> */}
            {/* <Link to="/" className="setting_title">
              <IoSettingsOutline
                style={{ width: "30px", height: "25px", marginRight: "30px" }}
              />
              Settings
            </Link> */}
            <div className="setting-profile">
              <div className="edit-profile">
                <Link className="editProfile" onClick={openModal}>
                  <MdOutlineEdit
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  Edit Profile
                </Link>
                {isModalOpen && (
                  <div>
                    <EditProfle onClose={closeModal} />
                  </div>
                )}
              </div>
              <hr className="edit-divider" />

              <div className="logout-content">
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="logout"
                >
                  <TbLogout
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "10px",
                      marginRight: "7px",
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
