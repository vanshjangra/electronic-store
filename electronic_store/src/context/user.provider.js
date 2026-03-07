import { useEffect, useState } from "react"
import UserContext from "./user.context"
import {doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isLoggedIn} from "./../auth/helper.auth";
import {isAdminUser as adminUser} from "./../auth/helper.auth";

const UserProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    }, []);

    const doLogin = (data) => {
        doLoginLocalStorage(data);
        setIsLogin(true);
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    };

    const doLogout = () => {
        doLogoutFromLocalStorage();
        setIsLogin(false);
        setIsAdminUser(adminUser())
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{userData: userData, setUserData: setUserData,
                                      isLogin: isLogin, isAdminUser: isAdminUser, setIsLogin: setIsLogin,
                                      login: doLogin, logout: doLogout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider