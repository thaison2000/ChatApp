import React, { useContext, useEffect, useRef, useState } from 'react'
import { APIgetCompanyProfile, APIupdateCompanyAvatar, APIupdateCompanyProfile } from '../API/Company'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { Context } from '../context/Context'

const Company = (props: any) => {

    const { user: currentUser, dispatch } = useContext(Context)
    const name = useRef<any>()
    const desc = useRef<any>()

    const [clickProfileEdit, setClickProfileEdit] = useState(false)
    const [avatar, setAvatar] = useState<any>()
    const [menu, setMenu] = useState<boolean>(false)
    const [company, setCompany] = useState<any>()

    //lay thong tin ca nhan nguoi dung
    useEffect(() => {
        const getComPanyProfile = async () => {
            const { status, data } = await APIgetCompanyProfile(currentUser.companyId)
            if (status) {
                setCompany(data)
            }
        }
        getComPanyProfile()

    }, [currentUser, clickProfileEdit]);

    //xu ly khi thay doi anh dai dien
    const handleSubmitUpdateAvatar = async () => {
        let fileName = ''
        if (avatar) {
            const { status, data }: any = await APIupdateCompanyAvatar(avatar, currentUser.companyId)
            if (status) {
                fileName = data
                setAvatar(null)
                window.location.reload()
            }
        }
    };

    // xu ly khi thay doi thong tin ca nhan
    const handleClickSubmitUpdateProfile = async () => {
        const { status }: any = await APIupdateCompanyProfile({
            companyId: currentUser.companyId,
            name: name.current.value,
            desc: desc.current.value
        })
        if (status) {
            setClickProfileEdit(!clickProfileEdit)
        }
    };

    const handleClickProfileEdit = () => {
        setClickProfileEdit(!clickProfileEdit)
    }

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    const ProfileEditForm = () => {
        return (
            <div className='drop-shadow-2xl bg-white rounded-2xl p-4 mt-4 w-full sm:m-6 sm:w-[500px] sm:h-[450px]'>
                <div className='mx-8 mt-4 flex flex-row'>
                    <span className='text-2xl text-sky-700 font-bold w-[300px]'>Company information</span>
                    <svg onClick={handleClickProfileEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:text-red-700">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                </div>
                <div className='flex flex-col mx-8 my-2 justify-between'>
                    <div className='flex flex-row my-2'>
                        <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                        <span className='text-xl w-[100px] text-sky-700 font-bold'>Name</span>
                        <input ref={name} className='w-[200px] text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' defaultValue={company.name} />
                    </div>
                    <div className='flex flex-row my-2'>
                        <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                        <span className='text-xl w-[100px] text-sky-700 font-bold'>Desc</span>
                        <input ref={desc} className='w-[200px] text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' defaultValue={company.desc} />
                    </div>
                    <div className='flex flex-row my-2'>
                        <span className='text-xl w-[100px] text-sky-700 font-bold ml-3'></span>
                        <button onClick={handleClickSubmitUpdateProfile} className='text-xl text-stone-700 font-normal p-2 pl-4 bg-green-500 rounded-xl p-2 flex flex-row hover:bg-green-600 hover:text-white'>
                            <span className=' mr-2 font-bold'>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-screen h-screen pointer-events-auto'>
            <TopBar socket={props.socket} />
            <div className='w-full h-[calc(100%-50px)] flex flex-col sm:flex sm:flex-row'>
                <div onClick={handleClickMenu} className='w-full sm:w-0 sm:h-0 flex flex-row bg-sky-700 hover:bg-sky-800'>
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
                    <div className='w-full flex flex-row sm:w-[calc(100%-250px)] relative z-10 overflow-auto'>
                        <div className='w-full xl:w-full p-4 xl:flex xl:flex-row xl:justify-start overflow-auto'>
                            <div className='w-full sm:m-6 sm:flex sm:flex-col sm:w-72'>
                                <div className=' flex flex-col relative sm:w-[300px] sm:h-[300px] drop-shadow-2xl bg-white sm:p-4 rounded-2xl h-[250px] justify-center items-center '>
                                    <img className='w-48 h-48 rounded-full' src={company?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + company?.avatar) : (`${process.env.REACT_APP_SERVER1_URL}` + '/' + 'images/nullAvatar.png')} alt="" />

                                </div>
                                {currentUser?.permission == 'Admin' || currentUser?.permission == 'SuperAdmin' ?
                                    <div className='relative drop-shadow-2xl bg-white rounded-2xl pb-6 mb-4 sm:mt-4 sm:w-[300px] '>
                                        <label className="block mb-2 text-sm w-[240px] mt-2 ml-4 font-medium text-gray-900 dark:text-gray-300">Change avatar</label>
                                        <input className="block w-[240px] text-sm text-slate-500 ml-3
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                                            type="file"
                                            id="avatar"
                                            accept=".png,.jpeg,.jpg"
                                            onChange={(e: any) => setAvatar(e.target.files[0])}
                                        ></input>
                                        {avatar ? <div className="w-[250px] flex flex-row">
                                            <img className=" ml-4 mt-4 w-40 h-40 object-contain" src={URL.createObjectURL(avatar)} alt="" />
                                            <div className='flex flex-col'>
                                                <svg onClick={handleSubmitUpdateAvatar} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mt-8 ml-4 hover:text-green-700" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                                                </svg>
                                                <svg onClick={() => setAvatar(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-10 ml-4 hover:text-red-700">
                                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                                                    <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </div>

                                        </div> : null
                                        }
                                    </div> : null}
                            </div>
                            <div className='w-full'>
                                {clickProfileEdit ? <ProfileEditForm /> :
                                    <div className='drop-shadow-2xl bg-white rounded-2xl p-2 mt-2 w-full sm:m-6 sm:w-[500px] sm:h-[415px]'>
                                        <div className='mx-8 mt-4 flex flex-row'>
                                            <span className='text-2xl text-sky-700 font-bold w-[300px]'>Company information</span>
                                            {currentUser?.permission == 'Admin' || currentUser?.permission == 'SuperAdmin' ?
                                                <svg onClick={handleClickProfileEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:text-green-700">
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                                </svg> : null
                                            }
                                        </div>
                                        <div className='flex flex-col mx-8 my-2 justify-between'>
                                            <div className='flex flex-row my-2'>
                                                <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                                                <span className='text-xl w-[100px] text-sky-700 font-bold'>Name</span>
                                                <span className='text-xl text-stone-500 font-normal overflow-auto'>{company?.name}</span>
                                            </div>
                                            <div className='flex flex-row my-2'>
                                                <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                                                <span className='text-xl w-[100px] text-sky-700 font-bold'>Desc</span>
                                                <span className='text-xl text-stone-500 font-normal'>{company?.desc}</span>
                                            </div>
                                        </div></div>
                                }
                            </div>
                        </div>

                    </div>}
            </div>
        </div>
    )
}

export default Company