import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIRegister } from '../API/Auth'
import { APIdeleteCompanyUser, APIgetCompanyUsers, APIlockCompanyUser, APIunlockCompanyUser } from '../API/Company'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { Context } from '../context/Context'

const Member = (props: any) => {

    const navigate = useNavigate()

    const { user } = useContext(Context)

    const [clickCreateUser, setClickCreateUser] = useState(false)
    const [users, setUsers] = useState([])
    const [newUserCount, setNewUserCount] = useState(0)
    const [updateUser, setUpdateUser] = useState(false)
    const scrollRef = useRef<any>()
    const [menu, setMenu] = useState<boolean>(false)

    const name = useRef<any>()
    const email = useRef<any>()
    const role = useRef<any>()
    const password = useRef<any>()
    const againPassword = useRef<any>()

    console.log(user)


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

    const handleClickSubmitCreateAccount = async () => {
        if (window.confirm('Are you sure you want to create new account ?')) {
            const { status, data }: any = await APIRegister({
                email: email.current.value,
                name: name.current.value,
                password: password.current.value,
                againPassword: againPassword.current.value,
                userRole: role.current.value,
                companyId: user.companyId
            })

            if (status) {
                setNewUserCount((prev: number) => prev + 1)
                setClickCreateUser(!clickCreateUser)
            }
        }
    }

    const handleClickSubmitDeleteAccount = async (userId: any) => {
        if (window.confirm('Are you sure you want to delete this account ?')) {
            const { status, data }: any = await APIdeleteCompanyUser(userId)

            if (status) {
                setNewUserCount((prev: number) => prev + 1)
            }
        }
    }

    const handleClickSubmitLockAccount = async (userId: any) => {
        if (window.confirm('Are you sure you want to lock this account ?')) {
            const { status, data }: any = await APIlockCompanyUser(userId)

            if (status) {
                setNewUserCount((prev: number) => prev + 1)
            }
        }
    }

    const handleClickSubmitUnlockAccount = async (userId: any) => {
        if (window.confirm('Are you sure you want to unlock this account ?')) {
            const { status, data }: any = await APIunlockCompanyUser(userId)

            if (status) {
                setNewUserCount((prev: number) => prev + 1)
            }
        }
    }

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    const CreateUserForm = () =>
    (
        <div className='relative px-4 pt-4'>
            <div className='flex'>
                <div className='shadow-2xl'>
                    <div className='w-full h-[50px] bg-sky-700 rounded-t-lg'>
                        <h1 className='text-center text-white text-2xl font-medium p-2'>Create new account</h1>
                    </div>
                    <div className='w-full px-12'>
                        <input ref={email} className=' w-full py-4 mr-16 focus:outline-none' type="text" placeholder='email ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={name} className=' w-full py-4 mr-16 focus:outline-none' type="text" placeholder='username ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={password} className=' w-full py-4 mr-16 focus:outline-none' type="password" placeholder='password ...' />
                    </div>
                    <div className='w-full px-12'>
                        <input ref={againPassword} className=' w-full py-4 mr-16 focus:outline-none' type="password" placeholder='rewrite password ...' />
                    </div>
                    <div className='flex flex-row my-2 w-full px-12'>
                        <span className='w-[100px] text-gray-400 my-2'>role</span>
                        <select className='w-[200px] text-xl text-stone-500 font-normal p-2 pl-4 pr-4 enabled:bg-gray-200 rounded-xl' ref={role} name="role" id="role" defaultValue={user.gender}>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>

                    </div>
                    <div className='flex flex-row my-4 justify-center'>
                        <button onClick={handleClickSubmitCreateAccount} className='text-xl text-stone-700 font-normal p-2 pl-4 bg-green-500 rounded-xl p-2 flex flex-row hover:bg-green-600 hover:text-white'>
                            <span className=' mr-2 font-bold'>Submit</span>
                        </button>
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
                            {
                                user.role = 'Admin' ?
                                    <div onClick={handleClickCreateUser} className='m-4 bg-sky-700 text-white p-4 font-bold text-xl hover:bg-sky-800 pointer-events-auto inline-block'>
                                        Create a user
                                    </div> : null
                            }
                        </div>
                        <div className='h-[calc(100%-125px)] sm:h-[calc(100%-40px)] w-full overflow-auto'>
                            <div className='divide-y'>
                                {
                                    clickCreateUser ?
                                        <div ref={scrollRef}>
                                            <CreateUserForm />
                                        </div> : null
                                }
                                <div className='w-full'>

                                    <div className="sm:overflow-x-auto p-4">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-200 overflow-x-auto">
                                            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-gray-200">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 ">
                                                        User
                                                    </th>
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
                                                        Active
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-center">
                                                        Edit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className='w-full'>

                                                {
                                                    users.map((User: any) => <tr key={User.userId} className="bg-white border-b dark:bg-neutral-100 dark:border-gray-500">
                                                        <td scope="row" className="px-6 font-medium text-black whitespace-nowrap dark:text-black">
                                                            <img onClick={() => {
                                                                navigate('/profile/' + User.userId, { replace: true })
                                                                window.location.reload()
                                                            }}
                                                                className='w-10 h-10 rounded-full' src={User?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + User?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                                            {User.email}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                                            {User.name}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                                            {User.role}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                                            {User.status = 1? 'Active': 'Unactive'}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black flex flex-row justify-center">
                                                            {((User.role == 'User' && user.role == 'Admin') || (User.role != 'SuperAdmin' && user.role == 'SuperAdmin')) ? <div className='mx-2'>
                                                                <button onClick={() => handleClickSubmitDeleteAccount(User.userId)} className=" text-white py-2 px-4 font-medium text-xl bg-red-500 hover:bg-red-900 hover:text-white">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                                    </svg>

                                                                </button>
                                                            </div> : null}
                                                            {
                                                                (User.role == 'User' && user.role == 'Admin' && User.status == 'Unlocked') ?
                                                                    <button onClick={() => handleClickSubmitLockAccount(User.userId)} className=" text-white py-2 px-4 font-medium text-xl bg-green-500 hover:bg-green-900 hover:text-white">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </button> : null

                                                            }
                                                            {
                                                                (User.role == 'User' && User.status == 'Locked') ?
                                                                    <button onClick={() => handleClickSubmitUnlockAccount(User.userId)} className=" text-white py-2 px-4 font-medium text-xl bg-yellow-500 hover:bg-yellow-900 hover:text-white">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                                                                        </svg>
                                                                    </button> : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Member