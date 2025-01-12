import {Routes, Route} from "react-router-dom"
import {Home} from "../Pages/Home";
import {Signup} from "../Pages/Signup";
import {Login} from "../Pages/Login";
import {Tasks} from "../Pages/Tasks";
import {ManageTask} from "../Pages/ManageTask";
import { PrivateRoutes } from "./PrivateRoutes";

export function AllRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="/managetask" element={<PrivateRoutes><ManageTask /></PrivateRoutes>}></Route>
        </Routes>
    )
}
