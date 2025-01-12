import { useState } from "react";
import { userLogin } from "../Redux/userReducer/action"; // Adjust import path as needed
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {isLoggedin} = useSelector((store)=> store.userReducer);
    const dispatch = useDispatch();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            setLoading(true);
            const response = await userLogin(formData);
            setLoading(false);

            if(response?.error || !response){
                toast.error(response?.message || "Internal Error")
            }else{
                toast.success(response?.message);
                navigate("/", {replace: true});
                dispatch({type:"LOGIN", payload: response?.data})
            }
            
        } catch (error) {
            setLoading(false);            
            toast.error("An error occurred. Please try again.");
        }
    };

    if(isLoggedin){
        return <Navigate to={'/'} />
    }

    return (
        <section className="w-full min-h-screen px-4 sm:px-8 flex flex-col justify-center items-center bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        minLength={8}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up here
                    </Link>
                </p>
            </form>
        </section>
    );
}
