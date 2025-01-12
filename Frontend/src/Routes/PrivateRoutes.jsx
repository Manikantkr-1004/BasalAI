import { useEffect } from "react";
import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

export function PrivateRoutes({children}) {
    
    const {isLoggedin} = useSelector((store)=> store.userReducer);

    useEffect(() => {
        if(!isLoggedin){
            <Navigate to="/login" />
        }
    }, [isLoggedin])

    if(!isLoggedin){
        return <Navigate to="/login" />
    }

    return children;
}
