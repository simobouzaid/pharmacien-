import { useRef, useState } from "react";

function Login() {

    const email = useRef<HTMLInputElement>(null);
    const password =  useRef<HTMLInputElement>(null);
    const [errorEmail, setErrorEmail] = useState<string>();
    const [errorPassword, setErrorPassword] = useState<string>();


// Si le champ e-mail est vide, il faut afficher un message d'erreur.Si le champ e-mail est vide, il faut afficher un message d'erreur.
    const handlErrorEmail = () => {
        if (email.current?.value.length === 0) {
            setErrorEmail('l\' e-mail est vite ');
        }else{
            setErrorEmail('')
        }
    }
// Si le champ password est vide, il faut afficher un message d'erreur.Si le champ e-mail est vide, il faut afficher un message d'erreur.
    const handlErrorPassword =()=>{
  if (password.current?.value.length === 0) {
            setErrorPassword('le password est vite');
        }else{
            setErrorPassword('')
        }
    }

  
// envoyer les donner dans serveur
const handlSubmit =(e: React.MouseEvent<HTMLInputElement>)=>{
e.preventDefault()
}

    return (
    <form className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-96 mx-auto mt-20">
  <h3 className="text-2xl font-bold mb-6 text-gray-700">Login</h3>

  {errorEmail && <p className="text-red-500 text-sm mb-1">{errorEmail}</p>}
  <input
    type="email"
    ref={email}
    onChange={handlErrorEmail}
    placeholder="Enter email"
    className={`w-full rounded-lg border px-3 py-2 mb-4 text-center outline-none focus:ring-2 focus:ring-blue-400 ${
      errorEmail ? "border-red-500 text-red-500" : "border-gray-300"
    }`}
  />


  {errorPassword && <p className="text-red-500 text-sm mb-1">{errorPassword}</p>}
  <input
    type="password"
    ref={password}
    onChange={handlErrorPassword}
    placeholder="Enter password"
    className={`w-full rounded-lg border px-3 py-2 mb-6 text-center outline-none focus:ring-2 focus:ring-blue-400 ${
      errorPassword ? "border-red-500 text-red-500" : "border-gray-300"
    }`}
  />

  <input
    type="submit"
    onClick={handlSubmit}
    value="Login"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer transition duration-200"
  />
</form>

    );
};

export default Login;