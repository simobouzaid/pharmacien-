import { createBrowserRouter } from "react-router-dom";
import Layout from '../layout/Layout';
import Home from "../page/Home";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Stock from './../page/stock/stock';
import Produit from "../page/produit/produit";
import Vente from "../page/vente/Vente";
import ShowVentes from "../page/vente/indexVentes";
import AjouterStock from "../page/stock/AjouterStock";

export const router =createBrowserRouter([
    {
    element:<Layout />,
    children:[
        
        
        {
        element:<Home />,
        path:"/"
    },
        {
        element:<Stock /> ,
        path:"/stock"
    },
        {
        element:<Produit />,
        path:"/produit"
    },
        {
        element:<Vente />,
        path:"/vente"
    },
    
        {
        element:<ShowVentes />,
        path:"/showVentes"
    },
    
    
        {
        element:<AjouterStock />,
        path:"/AjouterStock"
    },




]

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



