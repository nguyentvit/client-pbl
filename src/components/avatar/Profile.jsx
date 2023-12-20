import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
// import logoImg from '../img/logo.png';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); // Accessing user and logout function from AuthContext

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
            <Link
              
              to="/"
              className="profile_title"
            >
              <CgProfile style={{ width: "30px", height: "25px" , marginRight:"30px"}} />
              Profile
            </Link>
            <br />
            <Link
              
              to="/"
              className="setting_title"
            >
               <IoSettingsOutline style={{ width: "30px", height: "25px" , marginRight:"30px"}} />
            Settings
            </Link>
           
            <br />
            <Link
              onClick={() => logoutUser()}
              to="/login"
              className="logout "
            >
              <TbLogout style={{ width: "30px", height: "25px" , marginRight:"30px"}} />
              Logout
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
