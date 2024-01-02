// import { useParams } from "react-router-dom";
// import {Button, Col, Row, Stack} from "react-bootstrap"
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// const RegisterSuccess = () => {
//     const {token} = useParams();
//     const {activeAccout} = useContext(AuthContext);
//     // const [verificationLoading, setVerificationLoading] = useState(false);
//     return ( 
//             <div>
                
//                 <Row className="login-container" style={{marginLeft: "600px", height: "200px", marginTop: "250px"}}>
//                  <Col xs="6">
//           <Stack gap={3}>
//             <h2 style={{marginTop: "-150px", width: "380px", marginLeft: "-80px"}}>Verify Your Account</h2>
//             <Link to="/login" className="navbar-links-container" style={{marginLeft: "80px"}}>
                   
//                    <Button onClick={() => activeAccout(token)}>Verify</Button></Link>
//                    {/* {verificationLoading && <p>Loading...</p>} */}
//                 </Stack>
//         </Col>
//       </Row>
//             </div>
//      );
// }
 
//  export default RegisterSuccess;
// import { useState, useParams } from "react";
// import { Button, Col, Row, Stack } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const RegisterSuccess = () => {
//     const { token } = useParams();
//     const { activeAccout } = useContext(AuthContext);
//     const history = useHistory();
//     const [verificationLoading, setVerificationLoading] = useState(false);
//     const [verificationSuccess, setVerificationSuccess] = useState(false);

//     const handleVerification = async () => {
//         setVerificationLoading(true);

//         try {
//             await activeAccout(token);

//             setTimeout(() => {
//                 setVerificationSuccess(true);
//                 setVerificationLoading(false);

//                 // Sau khi xác minh thành công và thông báo đã hiển thị trong 3 giây, chuyển hướng đến trang đăng nhập
//                 history.push("/login");
//             }, 3000); // Thời gian đợi 3 giây trước khi chuyển hướng
//         } catch (error) {
//             console.error("Error during verification:", error);
//             // Xử lý lỗi xác minh tại đây (nếu cần)
//         }
//     };

//     return (
//         <div>
//             <Row className="login-container" style={{ marginLeft: "600px", height: "200px", marginTop: "250px" }}>
//                 <Col xs="6">
//                     <Stack gap={3}>
//                         <h2 style={{ marginTop: "-150px", width: "380px", marginLeft: "-80px" }}>Verify Your Account</h2>
//                         {/* Hiển thị nút xác minh và chạy hàm xác minh khi nhấn */}
//                         <Link to="/login" className="navbar-links-container" style={{marginLeft: "80px"}}>
                   
//                       <Button onClick={() => activeAccout(token)}>Verify</Button></Link>
//                         {verificationLoading && <p>Loading...</p>}
//                         {/* {verificationSuccess && (
//                             <p style={{ color: "green" }}>Your account has been successfully verified!</p>
//                         )} */}
//                     </Stack>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default RegisterSuccess;
import { useParams, useHistory } from "react-router-dom";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const RegisterSuccess = () => {
    const { token } = useParams();
    const history = useHistory();
    const { activeAccout } = useContext(AuthContext);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationDone, setVerificationDone] = useState(false);
    const handleVerify = async () => {
        setVerificationLoading(true);
        try {
            const response = await activeAccout(token);
            // Xử lý response
            setVerificationDone(true);
            // Chuyển hướng sau vài giây
            setTimeout(() => {
                history.push('/login');
            }, 10000);
        } catch (error) {
            // Xử lý lỗi
        }
        setVerificationLoading(false);
    };
    return (
        <div>
            <Row className="login-container" style={{ marginLeft: "600px", height: "200px", marginTop: "250px" }}>
                <Col xs="6">
                    <Stack gap={3}>
                        <h2 style={{ marginTop: "-150px", width: "380px", marginLeft: "-80px" }}>Verify Your Account</h2>
                        <Button onClick={handleVerify} disabled={verificationLoading}>
                            {verificationLoading ? 'Verifying...' : 'Verify'}
                        </Button>
                        {verificationDone && <p>Your account has been verified! Redirecting to login...</p>}
                        {/* Hiển thị lỗi ở đây nếu cần */}
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}
export default RegisterSuccess;
