import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import { Link } from "react-router-dom";
// import logoImg from '../img/logo.png';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); // Accessing user and logout function from AuthContext

  // const handleLogout = () => {
  //   // Implement logout logic here
  //   logout(); // Example: calling a logout function from AuthContext
  // };

  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
        
      {user && user.avatar ? (
          <img
            src={user.avatar} // Assume 'avatar' is the property containing the user's image URL
            alt="User Avatar"
            width="20"
            height="20"
            className="user-avatar"
          />
        ) : (
          <img width="48" height="48" src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png" alt="circled-user-male-skin-type-3--v1"/>)}
      </div>
      <div className="Username">
      {user && (
          <>
            <span className="text-warning">  Hi, {user?.name}</span>
          </>
        )}
        </div>
      {isOpen ? (
        <div
          className="profile-box"
        >
          <div className="profile-context">
          {/* <img src={logoImg} alt="Logo" /> */}
       
              Profile<br />
              Settings<br />
              <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
           
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
