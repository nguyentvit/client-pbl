import { useContext ,  useRef, useEffect, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/NavBar.css";
import logoImg from "../img/logo.png";
import Notification from "./chat/Notification.jsx";
import Profile from "./avatar/Profile";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  //const Menus = ["profile", "Your apps", "Settings", "Logout"];
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setIsOpenNotification(false);
        setIsOpenProfile(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  return (
    <Navbar className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <img src={logoImg} alt="Logo" />

        <Link to="/" className="header_logo ">
          LiveTalk
        </Link>
        <Nav>
          <Stack direction="horizontal" gap={3}>
          {user && (
          <>
            <div ref={notificationRef}>
              <Notification />
            </div>
            <div ref={profileRef}>
              <Profile />
            </div>
          </>
        )}
            {!user && (
              <>
                <div className="navbar-links-container">
                  <Link to="/" className="navbar-links-container">
                    Home
                  </Link>
                  <Link to="/about" className="navbar-links-container">
                    Introduce
                  </Link>
                  {/* <Link to="/footer" className="navbar-links-container">
                    Contact
                  </Link> */}
                </div>
                <div className="navbar-links-container">
                  <Link to="/login" className="navbar-links-container">
                    Login
                  </Link>

                  <Link to="/register" className="navbar-links-container">
                    Register
                  </Link>
                </div>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
