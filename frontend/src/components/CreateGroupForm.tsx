import axios from "axios"
import { useState } from "react"
import { APIcreateGroup } from "../API/Group";


const CreateGroupForm = (props: any) => {

    const [name,setName] = useState<string>('')
    const [desc,setDesc] = useState<string>('')

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
    }

    const handleClickCreateGroup = async (e: any) => {
        e.preventDefault();
    
        const { status } = await APIcreateGroup(name,desc)
        if(status){
          window.location.reload()
        }
      };


    return (
        <div className='fixed top-[120px] left-[520px] z-10 w-[500px] h-[300px] bg-white drop-shadow-xl rounded-lg'>
            <div className='w-full h-[50px] bg-sky-900 rounded-t-lg'>
                <h1 className='text-center text-white text-2xl font-medium p-2'>Create Chanel</h1>
            </div>
            <div>
                <div className='w-full px-12'>
                    <input onChange={handleNameChange} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='name ...' />
                </div>
                <div className='w-full px-12'>
                    <input onChange={handleDescChange} className='w-full my-4 py-4 focus:outline-none' type="password" placeholder='description ...' />
                </div>
                <div className='w-full flex flex-row justify-center '>
                    <button onClick={handleClickCreateGroup} className="rounded-full text-white py-2 px-8 font-medium text-xl bg-green-600 hover:bg-sky-900 hover:text-white">Create</button>
                    <button onClick={props.handleClickCreateGroupForm} className="rounded-full ml-6 text-white py-2 px-8 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroupForm