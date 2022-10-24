import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState<string>()
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [againPassword, setAgainPassword] = useState<string>()
    const navigate = useNavigate()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleAgainPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgainPassword(e.target.value)
    }

    const handleClickRegister = async (e: any) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/api/auth/register", {
                email,
                name,
                password,
                againPassword,
            });
            navigate('/login')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='w-screen h-screen bg-white px-[500px] py-[90px]'>
            <div className='w-full h-full bg-white flex flex-col drop-shadow-xl'>
                <div className='w-full h-[50px] bg-sky-900 rounded-t-lg'>
                    <h1 className='text-center text-white text-2xl font-medium p-2'>Chat App</h1>
                </div>
                <div>
                    <div className='w-full px-12'>
                        <input onChange={handleEmailChange} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='email ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input onChange={handleNameChange} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='username ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input onChange={handlePasswordChange} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='password ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input onChange={handleAgainPasswordChange} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='rewrite password ...' />
                    </div>
                    <div className='w-full px-12'>
                        <h1 className='py-4 text-center text-lg font-medium'>Do you have an account ? <Link to='/login' className='text-lg font-normal text-rose-600'>Login now</Link></h1>
                    </div>
                    <div className='w-full flex flex-row justify-center'>
                        <button onClick={handleClickRegister} className="rounded-full bg-sky-900 text-white py-2 px-8 font-medium text-xl">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register