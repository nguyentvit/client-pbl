import { useParams } from "react-router-dom";
import {Button, Col, Row, Stack} from "react-bootstrap"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const RegisterSuccess = () => {
    const {token} = useParams();
    const {activeAccout} = useContext(AuthContext);
    // const [verificationLoading, setVerificationLoading] = useState(false);
    return ( 
            <div>
                
                <Row className="login-container" style={{marginLeft: "600px", height: "200px", marginTop: "250px"}}>
                 <Col xs="6">
          <Stack gap={3}>
            <h2 style={{marginTop: "-150px", width: "380px", marginLeft: "-80px"}}>Verify Your Account</h2>
            <Link to="/login" className="navbar-links-container" style={{marginLeft: "80px"}}>
                   
                   <Button onClick={() => activeAccout(token)}>Verify</Button></Link>
                   {/* {verificationLoading && <p>Loading...</p>} */}
                </Stack>
        </Col>
      </Row>
            </div>
     );
}
 
 export default RegisterSuccess;
