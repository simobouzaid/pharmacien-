import { useRef, useState } from "react";
import  { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { api } from "../../api/api";
 

function Login() {
   document.title='login'
   const nav:NavigateFunction =useNavigate()
    const email = useRef<HTMLInputElement>(null);
    const password =  useRef<HTMLInputElement>(null);
    const [errorEmail, setErrorEmail] = useState<string>();
    const [errorPassword, setErrorPassword] = useState<string>();
    // const [test,setTest] =useState<boolean>(); 
          
// Si le champ e-mail est vide, il faut afficher un message d'erreur.Si le champ e-mail est vide, il faut afficher un message d'erreur.
    const handlErrorEmail:()=>void = () => {
    
        if (email.current?.value.length === 0) {
            setErrorEmail('l\' e-mail est vite ');
        }else{
            setErrorEmail('')
        }


    }
// Si le champ password est vide, il faut afficher un message d'erreur.Si le champ e-mail est vide, il faut afficher un message d'erreur.
    const handlErrorPassword:()=>void =()=>{
  if (password.current?.value.length === 0) {
            setErrorPassword('le password est vite');
        }else{
            setErrorPassword('')
        }
    }

  
// envoyer les donner dans serveur
const handlSubmit:(e: React.MouseEvent<HTMLInputElement>)=>void =async(e)=>{
e.preventDefault()
 
   if (password.current?.value.length === 0) {
            setErrorPassword('le password est vite');
        }else{
            setErrorPassword('')
        }
          if (email.current?.value.length === 0) {
            setErrorEmail('l\' e-mail est vite ');
        }else{
            setErrorEmail('')
        }

       if (errorEmail == '' && errorPassword =='') {
             

              const res =await api.post('/login',{
                email:email.current?.value,
                password:password.current?.value,
              });

              console.log(res.data)
              if (res.data?.status) {
                localStorage.setItem('token',res.data?.token)
                console.log(localStorage.getItem('token'))
                nav('/')
              }

              if (!res.data?.status) {
                setErrorEmail('email ou mot de pass incorret')
                setErrorPassword('email ou mot de pass incorret')
                
              }else{
                setErrorEmail('')
                setErrorPassword('')
              }
       }


}

    return (
             

    <form className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-96 mx-auto mt-20">
  <h3 className="text-2xl font-bold mb-6 text-gray-700">Login </h3>
     

  {errorEmail && <p className="text-red-500 text-sm mb-1">{errorEmail}</p>}
  <input
    type="email"
    ref={email}
    onChange={handlErrorEmail}
    placeholder="Enter email"
    className={`w-full rounded-lg border px-3 py-2 mb-4 text-center outline-none focus:ring-2 focus:ring-yellow-400 ${
      errorEmail ? "border-red-500 text-red-500" : "border-gray-300"
    }`}
  />


  {errorPassword && <p className="text-red-500 text-sm mb-1">{errorPassword}</p>}
  <input
    type="password"
    ref={password}
    onChange={handlErrorPassword}
    placeholder="Enter password"
    className={`w-full rounded-lg border px-3 py-2 mb-6 text-center outline-none focus:ring-2 focus:ring-yellow-400 ${
      errorPassword ? "border-red-500 text-red-500" : "border-gray-300"
    }`}
  />

  <input
    type="submit"
    onClick={handlSubmit}
    value="Login"
    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer transition duration-200"
  />
  <Link to={'/register'} className=' text-xl hover:underline transition duration-200'>register</Link>
</form>

    );
};

export default Login;