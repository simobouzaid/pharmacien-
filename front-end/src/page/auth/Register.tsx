
import { useRef, useState } from 'react';
import { Link, useNavigate, type NavigateFunction } from 'react-router-dom';
import { api } from '../../api/api';

const Register = () => {
       document.title='register'

    const nav: NavigateFunction = useNavigate()
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const prenomRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>()

    const handlRegister: (e: React.MouseEvent<HTMLInputElement>) => void = async (e) => {
        e.preventDefault()
        if (nameRef.current?.value.length === 0 || passwordRef.current?.value.length === 0 || emailRef.current?.value.length === 0 || prenomRef.current?.value.length === 0) {
            setError('touts les champes obligatoir');
        } else {
            setError('')
            console.log(nameRef.current?.value + '\n ' + passwordRef.current?.value + ' \n ' + emailRef.current?.value + '\n' + prenomRef.current?.value)
            await api.post('/user', {
                name: nameRef.current?.value,
                prenom: prenomRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            }).then((res) => {
                if (res.data?.status) {
                    nav('/login')
                } else {
                    setError('email ou name ou prenom incorrect')
                }
            }).catch(() => {
                setError('email ou name ou prenom incorrect')
            });
        }



    }

    return (

        <form className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-96 mx-auto mt-20">
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Register </h3>


            {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
            <input
                type="text"
                ref={nameRef}

                placeholder="Enter name"
                className='w-full rounded-lg border px-3 py-2 mb-4 text-center outline-none focus:ring-2 focus:ring-yellow-400 '
            />
            <input
                type="text"
                ref={prenomRef}

                placeholder="Enter prenom"
                className='w-full rounded-lg border px-3 py-2 mb-4 text-center outline-none focus:ring-2 focus:ring-yellow-400 '
            />
            <input
                type="email"
                ref={emailRef}

                placeholder="Enter email"
                className='w-full rounded-lg border px-3 py-2 mb-4 text-center outline-none focus:ring-2 focus:ring-yellow-400 '
            />



            <input
                type="password"
                ref={passwordRef}
                placeholder="Enter password"
                className='w-full rounded-lg border px-3 py-2 mb-6 text-center outline-none focus:ring-2 focus:ring-yellow-400 '
            />

            <input
                type="submit"
                onClick={handlRegister}
                value="register"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer transition duration-200"
            />
            <Link to={'/login'} className=' text-xl hover:underline transition duration-200'>login</Link>
        </form>

    );

};

export default Register;