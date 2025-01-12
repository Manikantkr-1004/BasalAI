import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

export function Home() {
    
    const {isLoggedin, name, email} = useSelector((store)=> store.userReducer);  

    return (
        <section className="w-full min-h-screen px-4 sm:px-8 flex flex-col justify-center items-center gap-3">
            <h1 className="text-3xl font-bold capitalize">Welcome to {(isLoggedin && name) ? name:"Basal AI"}😊</h1>
            {isLoggedin && email && <p className="font-medium">Your Email: {email}</p>}
            <Link className="px-3 py-1 bg-blue-600 text-white rounded shadow" to={'/tasks'}>View All Task</Link>
        </section>
    )
}
