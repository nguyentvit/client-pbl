import { useParams } from "react-router-dom";
import {Button} from "react-bootstrap"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const RegisterSuccess = () => {
    const {token} = useParams();
    const {activeAccout} = useContext(AuthContext);
    return ( 
            <div>
                <h1>Xác thực đăng ký tài khoản</h1>
                <Button onClick={() => activeAccout(token)}>Xác thực</Button>
            </div>
     );
}
 
export default RegisterSuccess;