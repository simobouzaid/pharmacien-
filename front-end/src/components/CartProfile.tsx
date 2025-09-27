import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
type user={
    name:string,
    prenom:string,
    email:string
}
const CartProfile = () => {

     const [user,setUser]=useState<user>({name:'',prenom:'',email:''})
     const nav = useNavigate()
    useEffect(() => {
        const getprofile = async () => {
             await api.get('/indexUser',{
                headers:{
                    Authorization:`bearer ${localStorage.getItem('token')}`
                }
             }).then((response)=>{
                  const data =response.data.user
                  setUser({
                    name:data.name,prenom:data.prenom,email:data.email
                  })
             })
        }
        getprofile()
    }, [])


    return (
        <div className="shadow-2xl border-2 m-2  border-amber-300 text-center ">
            <h2 className="font-bold">{user.name+' '+user.prenom}</h2>
            <h3>{user.email}</h3>
            <button 
            onClick={async() =>{
                await api.get('/logout',{ headers :{
                    Authorization:`bearer ${localStorage.getItem('token')}`
                }}).then((r)=>{
                    console.log(r.data)
                    if(r.data.status){

                        localStorage.removeItem('token')
                    nav('/login')
                    }
                }).catch((r)=>{
                    console.log(r.data)
                        localStorage.removeItem('token')
                    nav('/login')
                })
            }}
            className="bg-red-500 text-white px-2 rounded-xl mb-1 hover:scale-105 hover:bg-red-400 transition duration-300"
            >deconexion</button>
        </div>
    );
};

export default CartProfile;