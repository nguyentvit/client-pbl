
import { Routes, Route} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ChatContextProvider } from "./context/ChatContext";
// import {Mainpage} from "./pages/Mainpage";
import Home from "./pages/Home";
import About from "./pages/About";
import Forgetpass from "./pages/Resetpass";
import Footer from "./pages/Footer";
import "./App.css";

const Mainpage = () => {
  return (
    <Container className="container" style={{maxWidth: '250vw', color: "white"}}>   <Home />

      <About />

      <Footer />
    </Container>
  );
};

function App() {
  const { user, token } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user} token={token}>
      <NavBar />

      <Container className="text-secondary" style={{maxWidth: '500vw'}}>
        <Routes>
          {/* <Route
            path="/login1"
            element={user ? <Chat token={token} /> : <Login />}
          /> */}

          <Route
            path="/register"
            element={user ? <Chat token={token} /> : <Register />}
          />

          <Route
            path="/login"
            element={user ? <Chat token={token} /> : <Login />}
          />

          <Route path="*" element={<Mainpage />} />
          <Route path = "/about" element={<About />} />
          <Route path = "/footer" element={<Footer />} />
          <Route path = "/forgetpass" element={<Forgetpass />} />
        
        </Routes>
      </Container>  
    </ChatContextProvider>
  );
}

export default App;
