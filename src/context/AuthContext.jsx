import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import {useHistory} from "react-router-dom"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [registerError, setRegisterError] = useState({});

    // register
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    // login
    const [loginError, setLoginError] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    //active register
    const [activeError, setActiveError] = useState(null);
    const [isActiveLoading, setIsActiveLoading] = useState(false);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
        const token = localStorage.getItem("Token");
        setToken(JSON.parse(token));
    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);
        if(response.error) {
            return setRegisterError({response, message: "Loi"});
        }
        history.push('/registersuccess');
        
        // localStorage.setItem("User", JSON.stringify(response));
        // setUser(response);

    }, [registerInfo])

    // const activeRegisterUser = useCallback(async (e) => {
    //     e.preventDefault();
    //     setIsActiveLoading(true);
    //     setActiveError(null);
    //     const response = await postRequest()

    // })

    const loginUser = useCallback(async (e) => {
        e.preventDefault();

        setIsLoginLoading(true);
        setLoginError(null);
        const response = await postRequest(`${baseUrl}/login`, JSON.stringify(loginInfo));


        setIsLoginLoading(false);
        if (response.error) {
            return setLoginError({response, message: 'Thông tin đăng nhập không chính xác'});
        }
        localStorage.setItem("User", JSON.stringify(response.user));
        setUser(response.user);

        localStorage.setItem("Token", JSON.stringify(response.token));
        setToken(response.token);
        

    }, [loginInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
        localStorage.removeItem("Token");
        setToken(null);
    }, [])

    return <AuthContext.Provider value={{
        user, 
        token,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
        
    }}>
        {children}
    </AuthContext.Provider>
}