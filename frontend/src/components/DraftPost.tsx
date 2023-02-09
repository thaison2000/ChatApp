import { send } from 'process'
import React, { useContext, useEffect, useState } from 'react'
import { APIfetchAllGroups } from '../API/Group'
import { APIcreatePost, APIdeleteDraftPost, APIupdateDraftPost, APIuploadDocs } from '../API/Post'
import { Context } from '../context/Context'
import Editor from './Editor'

const DraftPost = (props: any) => {

    const { user } = useContext(Context)

    const [edit, setEdit] = useState(false)
    const [groupId, setGroupId] = useState('')
    const [groups, setGroups] = useState([])
    const [sendGroups, setSendGroups] = useState<Array<any>>([])


    useEffect(() => {
        const fetchAllGroups = async () => {
            const { status, data } = await APIfetchAllGroups()
            if (status) {
                setGroups(data)
            }
        }
        fetchAllGroups();
    })

    const handleClickSavePost = () => {

    }

    const handleClickEditPost = () => {
        setEdit(!edit)
    }

    const handleGroupIdChange = (e: any) => {
        setGroupId(e.target.value)
    }

    const handleClickSaveDraftPost = async (content: string, files: any) => {
        if (window.confirm('Are you sure you want to update this draft post ?')) {
            const { status } = await APIupdateDraftPost(props.draftPost.draftPostId, {
                content: content
            })
            if (status) {
                if (files) {
                    let type = 'draftPost'
                    
                    const { status }: any = await APIuploadDocs(files,props.draftPost.draftPostId, user.userId, type)
                  }
                setEdit(!edit)
                props.handleClickUpdateDraftPost()
            }
        }
    }

    const handleClickSendPostIntoGroup = async () => {
        if (window.confirm('Are you sure you want to send this post to groups ?')) {
            for (let i = 0; i < sendGroups.length; i++) {
                const { status } = await APIcreatePost({
                    content: props.draftPost.content,
                    groupId: sendGroups[i].groupId,
                    fileNames: props.draftPost.fileNames
                })
                props.socket?.current?.emit("sendMessage", {
                    sendUserName: user.name,
                    sendUserId: user.userId,
                    groupId: sendGroups[i].groupId,
                    content: props.draftPost.content,
                    type: 8
                  });
            }
            setSendGroups([])
        }
    }

    const handleClickDeleteDraftPost = async () => {

        props.handleClickDeleteDraftPost(props.draftPost.draftPostId)
    }

    const handleClickGroupRadioInput = (group: any) => {

        if (!sendGroups.some((sendGroup: any) => sendGroup.groupId == group.groupId)) {
            let data = sendGroups
            data.push(group)
            setSendGroups(data)
        }
        else {
            let data = sendGroups
            data = data.filter((value) => value.groupId != group.groupId)
            setSendGroups(data)
        }
    }

    return (
        <div>
            {edit ?
                <div className='border-2 w-[97%] m-4 relative bg-white pb-12'>
                    <div onClick={handleClickEditPost} className='absolute top-2 right-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                        </svg>

                    </div>
                    <div className='p-4 w-[96%] z-1'>
                        <Editor type={'updateDraftPost'} content={props.draftPost.content} handleClickSaveDraftPost={handleClickSaveDraftPost} />
                    </div>
                </div> :
                <div className='border-2 w-[95%] ml-4 my-4 relative bg-white mb-4 flex flex-col lg:flex lg:flex-row pt-4 max-h-[400px]'>
                    <div className='min-h-[100px] max-h-[500px] w-[95%] border-2 ml-2 mb-4 overflow-auto'>
                        <div className='bg-white  p-4 w-[100%] z-1 overflow-auto' dangerouslySetInnerHTML={{ __html: props.draftPost.content }}>
                        </div>
                        <div className='flex flex-row ml-2'>
                            {
                                props.draftPost.fileNames ? props.draftPost.fileNames?.map((fileName: any) => {

                                    return (
                                        <div className='m-4' >
                                            <div className='bg-neutral-200 text-center hover:bg-neutral-400 hover:text-white'>
                                                <a href={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName} className='w-20 h-8'>{fileName.split('.')[1]}</a>
                                            </div>
                                            <object className='w-24 h-16' data={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName}></object>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            <div className='mx-2'>
                                <button onClick={handleClickDeleteDraftPost} className=" text-white py-2 px-4 font-medium text-xl bg-red-500 hover:bg-red-900 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                    </svg>

                                </button>
                            </div>
                            <div onClick={handleClickEditPost} className='mx-2'>
                                <button className=" text-white py-2 px-4 font-medium text-xl bg-yellow-500 hover:bg-yellow-900 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                    </svg>

                                </button>
                            </div>
                            <div onClick={handleClickSendPostIntoGroup} className='mx-2'>
                                <button className=" text-white py-1.5 px-4 font-medium text-xl bg-sky-700 hover:bg-sky-900 hover:text-white">Send</button>
                            </div>
                        </div>
                        <div className=' m-2 mt-4 overflow-auto w-[94%] mb-4 max-h-[150px] border-2'>
                            {groups.map((group: any) => {
                                return (
                                    <div key={group.groupId}>
                                        <div className='flex flex-row bg-neutral-100 hover:bg-neutral-200'>
                                            <div
                                                className='w-4 h-4 rounded-full border-2 m-2'
                                                onClick={() => {
                                                    handleClickGroupRadioInput(group)
                                                }}
                                                style={(sendGroups.some((sendGroup: any) =>
                                                    sendGroup.groupId == group.groupId
                                                )) ? {
                                                    backgroundColor: 'green'
                                                }
                                                    :
                                                    {
                                                        backgroundColor: 'white'
                                                    }}></div>
                                            <div className='w-40 overflow-auto'>
                                                {group.name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default DraftPost