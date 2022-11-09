import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APILogin } from '../API/Auth'
import { Context } from '../context/Context'

const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const { dispatch } = useContext(Context);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleClickLogin = async (e: any) => {
        e.preventDefault();
        const { status, data }: any = await APILogin({
            email: email,
            password: password
        })
        if (status)
            dispatch({ type: 'LOG_IN', payload: data });
        navigate('/')
    }

    return (
        <div className='w-screen h-screen bg-white px-[500px] py-[180px]'>
            <div className='w-full h-full bg-white flex flex-col drop-shadow-xl'>
                <div className='w-full h-[50px] bg-sky-900 rounded-t-lg'>
                    <h1 className='text-center text-white text-2xl font-medium p-2'>Chat App</h1>
                </div>
                <div>
                    <div className='w-full px-12'>
                        <input onChange={handleEmailChange} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='email ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input onChange={handlePasswordChange} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='password ...' />
                    </div>
                    <div className='w-full px-12'>
                        <h1 className='py-4 text-center text-lg font-medium'>Do you have an account ? <Link to='/register' className='text-lg font-normal text-rose-600'>Register now</Link></h1>
                    </div>
                    <div className='w-full flex flex-row justify-center'>
                        <button onClick={handleClickLogin} className="rounded-full bg-sky-900 text-white py-2 px-8 font-medium text-xl">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

