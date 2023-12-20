import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/NavBar.css";
import logoImg from '../img/logo.png';
import Notification from "./chat/notification";
import Profile from "./avatar/Profile";


const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  //const Menus = ["profile", "Your apps", "Settings", "Logout"];
  return (
    <Navbar className="mb-4" style={{ height: "3.75rem" }}>
     
      <Container>
      
        <h2>
        <img src={logoImg} alt="Logo" />
          <Link to="/" className="link-light text-decoration-none">
             LiveTalk
          </Link>
        </h2>
        {/* {user && (
          <>
            <span className="text-warning">Logged in as {user?.name}</span>
          </>
        )} */}
         <Nav>
          
          <div className="navbar-links-container">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
          </div>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
              <Notification />
              <Profile />
                {/* <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link> */}
              </>
            )}
            {!user && (
              <>
              <div className="navbar-links-container"> 
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
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
