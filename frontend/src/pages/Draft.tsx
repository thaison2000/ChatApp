import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIcreateDraftPost, APIdeleteDraftPost, APIgetAllDraftPostByUserId } from '../API/Post'
import ChatWindow from '../components/ChatWindow'
import DraftPost from '../components/DraftPost'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const Draft = (props: any) => {

    const [clickCreateDraftPost, setClickCreateDraftPost] = useState(false)
    const [draftPosts, setDraftPosts] = useState([])
    const [newDraftPostCount, setNewDraftPostCount] = useState(0)
    const [updateDraftPost, setUpdateDraftPost] = useState(false)
    const scrollRef = useRef<any>()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [newDraftPostCount, updateDraftPost, clickCreateDraftPost, draftPosts.length]);

    useEffect(() => {
        const fetchAllDraftPost = async () => {
            const { status, data } = await APIgetAllDraftPostByUserId()
            if (status) {
                setDraftPosts(data)
            }
        };
        fetchAllDraftPost();
    }, [props.socket?.current, newDraftPostCount, updateDraftPost]);

    const handleClickCreateDraftPost = () => {
        setClickCreateDraftPost(!clickCreateDraftPost)
    }

    const handleClickUpdateDraftPost = () => {
        setUpdateDraftPost(!updateDraftPost)
    }

    const handleClickDeleteDraftPost = async (draftPostId: string) => {
        if (window.confirm('Are you sure you want to delete this draft post ?')) {
            const { status } = await APIdeleteDraftPost(draftPostId)
            if (status) {
                setNewDraftPostCount((prev: number) => prev - 1)
            }
        }
    }

    const handleClickSaveDraftPost = async (content: string) => {
        const { status } = await APIcreateDraftPost({
            content: content
        })
        if (status) {
            setNewDraftPostCount((prev: number) => prev + 1)
            setClickCreateDraftPost(!clickCreateDraftPost)
        }
    }

    const CreateDraftPostForm = () =>
    (
        <div className='border-2 w-[97%] mx-4 relative h-[160px] mt-12'>
            <div className='absolute h-[100px] p-4 w-[100%] z-1'>
                <Editor type={'draftPost'} handleClickSaveDraftPost={handleClickSaveDraftPost} />
            </div>

        </div>
    )

    return (
        <div className='w-screen h-screen pointer-events-auto'>
            <TopBar socket={props.socket} />
            <div className='w-full h-[calc(100%-50px)] flex flex-row'>
                <SideBar socket={props.socket} />
                <div className='w-[calc(100%-250px)]'>
                    <div onClick={handleClickCreateDraftPost} className='m-4 bg-sky-700 text-white p-4 font-bold text-xl hover:bg-sky-800 pointer-events-auto w-[220px]'>
                        Create a draft post
                    </div>
                    <div className='h-[570px] overflow-auto'>
                        <div className='divide-y'>
                            {
                                draftPosts.map((draftPost: any) => <div ref={scrollRef} key={draftPost.draftPostId} className='bg-neutral-100 mx-4 py-4'>
                                    <div className='pl-4 font-bold'>{timeAgo.format(new Date(draftPost.updatedAt))}</div>
                                    <DraftPost draftPost={draftPost} handleClickUpdateDraftPost={handleClickUpdateDraftPost} handleClickDeleteDraftPost={handleClickDeleteDraftPost} />
                                </div>
                                )
                            }
                            {
                                clickCreateDraftPost ? <div ref={scrollRef}>
                                    <CreateDraftPostForm />
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Draft