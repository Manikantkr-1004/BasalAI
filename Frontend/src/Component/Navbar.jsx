import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { userCheck, userLogout } from "../Redux/userReducer/action";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export function Navbar() {
    
    const {isLoggedin} = useSelector((store)=> store.userReducer);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        handleCheckAUth()
    }, [])

    const handleCheckAUth = async () => {
        try {
            const response = await userCheck();

            if(response?.error || !response){
                console.error(response?.message || "Internal Error")
            }else{
                dispatch({type:"LOGIN", payload: response?.data})
            }
        } catch (error) {
            console.error("An error occurred. Please try again.",error);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await userLogout(); // Call the API function
            setLoading(false);

            if(response?.error || !response){
                toast.error(response?.message || "Internal Error")
            }else{
                toast.success(response?.message);
                dispatch({type:"LOGOUT"})
            }
            
        } catch (error) {
            setLoading(false);            
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <nav className="w-full h-14 px-4 sm:px-8 bg-blue-600 text-white flex justify-between items-center gap-2">
            <Link to="/" className="font-bold text-lg">BasalAI</Link>
            <div className="flex justify-between items-center gap-3 text-sm font-medium text-blue-100">
                {!isLoggedin && <Link to="/login">Login</Link>}
                {!isLoggedin && <Link to="/register">Register</Link>}
                {isLoggedin && <Link to="/managetask">Manage Task</Link>}
                {isLoggedin && 
                <button disabled={loading} onClick={handleLogout}
                className={`py-1 px-2 rounded shadow-sm ${
                    loading
                        ? "bg-slate-100 text-black cursor-not-allowed"
                        : "bg-white text-slate-500"
                }`}>Logout</button>}
            </div>
        </nav>
    )
}
