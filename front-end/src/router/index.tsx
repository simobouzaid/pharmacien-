import { createBrowserRouter } from "react-router-dom";
import Layout from '../layout/Layout';
import Home from "../page/Home";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";

export const router =createBrowserRouter([
    {
    element:<Layout />,
    children:[{
        element:<Home />,
        path:"/"
    }]
}
,{

    element:<Login />,
    path:"/login"
}
,{

    element:<Register />,
    path:"/register"
}



]); 



