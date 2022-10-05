import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='w-screen h-screen bg-white px-[500px] py-[90px]'>
        <div className='w-full h-full bg-white flex flex-col drop-shadow-xl'>
            <div className='w-full h-[50px] bg-rose-600 rounded-t-lg'>
                <h1 className='text-center text-white text-2xl font-medium p-2'>Chat App</h1>
            </div>
            <div>
                <div className='w-full px-12'>
                    <input className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='email ...'/>
                </div>
                <div className='w-full px-12'>
                    <input className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='username ...'/>
                </div>
                <div className='w-full px-12'>
                    <input className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='password ...'/>
                </div>
                <div className='w-full px-12'>
                    <input className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='rewrite password ...'/>
                </div>
                <div className='w-full px-12'>
                    <h1 className='py-4 text-center text-lg font-medium'>Do you have an account ? <Link to='/login' className='text-lg font-normal text-rose-600'>Login now</Link></h1>
                </div>
                <div className='w-full flex flex-row justify-center'>
                <button className="rounded-full bg-rose-600 text-white py-2 px-8 font-medium text-xl">Register</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register