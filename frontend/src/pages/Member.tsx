import React, { useContext, useEffect, useRef, useState } from 'react'
import { APIRegister } from '../API/Auth'
import { APIgetCompanyUsers } from '../API/Company'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { Context } from '../context/Context'

const Member = (props: any) => {

    const { user } = useContext(Context)

    const [clickCreateUser, setClickCreateUser] = useState(false)
    const [users, setUsers] = useState([])
    const [newUserCount, setNewUserCount] = useState(0)
    const [updateUser, setUpdateUser] = useState(false)
    const scrollRef = useRef<any>()
    const [menu, setMenu] = useState<boolean>(false)

    const name = useRef<any>()
    const email = useRef<any>()
    const password = useRef<any>()
    const againPassword = useRef<any>()

    useEffect(() => {
        const fetchAllUser = async () => {
            const { status, data } = await APIgetCompanyUsers(user.companyId)
            if (status) {
                setUsers(data)
            }
        };
        fetchAllUser();
    }, [props.socket?.current, newUserCount, updateUser]);

    const handleClickCreateUser = () => {
        setClickCreateUser(!clickCreateUser)
    }

    const handleClickUpdateUser = () => {
        setUpdateUser(!updateUser)
    }

    const handleClickSaveUser = async () => {
        const { status, data }: any = await APIRegister({
            email: email.current.value,
            name: name.current.value,
            password: password.current.value,
            againPassword: againPassword.current.value,
        })

        if (status) {
            setNewUserCount((prev: number) => prev + 1)
            setClickCreateUser(!clickCreateUser)
        }
    }

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    const CreateUserForm = () =>
    (
        <div className='relative px-4 pt-4'>
            <div className='flex'>
                <div className='bg-neutral-200'>
                    <div className='w-full px-12'>
                        <input ref={email} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='email ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={name} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='username ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={password} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='password ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={againPassword} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='rewrite password ...' />
                    </div>
                </div>
            </div>

        </div>
    )

    return (
        <div className='w-screen h-screen pointer-events-auto'>
            <TopBar socket={props.socket} />
            <div className='w-full h-[calc(100%-50px)] flex flex-col sm:flex sm:flex-row'>
                <div onClick={handleClickMenu} className='w-full sm:w-0 flex flex-row bg-sky-700 hover:bg-sky-800'>
                    <div className='p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white hover:text-orange-300">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='py-4 text-xl text-white font-bold'>Menu</div>
                </div>
                <div className='w-0 h-0 sm:w-[250px] sm:h-full'>
                    <SideBar socket={props.socket} />
                </div>
                {menu ?
                    <div className='h-[calc(100%-64px)] sm:w-0 sm:h-0 '>
                        <SideBar socket={props.socket} />
                    </div>
                    :
                    <div className='w-full  h-[calc(100%-65px)]'>
                        <div className='h-[75px]'>
                            <div onClick={handleClickCreateUser} className='m-4 bg-sky-700 text-white p-4 font-bold text-xl hover:bg-sky-800 pointer-events-auto w-[220px]'>
                                Create a user
                            </div>
                        </div>
                        <div className='h-[calc(100%-125px)] sm:h-[calc(100%-40px)] w-full overflow-auto'>
                            <div className='divide-y'>
                                <div className='overflow-auto'>

                                    <div className="relative overflow-x-auto p-4">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-200">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-gray-200">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Username
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Role
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Edit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    users.map((user: any) => <tr className="bg-white border-b dark:bg-neutral-100 dark:border-gray-500">
                                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                                            {user.email}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {user.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {user.role}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            
                                                        </td>
                                                    </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                                {
                                    clickCreateUser ?
                                        <div ref={scrollRef}>
                                            <CreateUserForm />
                                        </div> : null
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Member