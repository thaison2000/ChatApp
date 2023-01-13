import React, { useEffect, useRef, useState } from 'react'
import { APIcreateDraftPost, APIdeleteDraftPost, APIgetAllDraftPostByUserId } from '../API/Post'
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
    const [menu, setMenu] = useState<boolean>(false)

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

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    const CreateDraftPostForm = () =>
    (
        <div className='relative px-4 pt-4'>
            <div className=''>
                <Editor type={'draftPost'} handleClickSaveDraftPost={handleClickSaveDraftPost} />
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
                    <div className='sm:w-0 sm:h-0'>
                        <SideBar socket={props.socket} />
                    </div>
                    :
                    <div className='w-full  h-[calc(100%-65px)]'>
                        <div className='h-[75px]'>
                            <div onClick={handleClickCreateDraftPost} className='m-4 bg-sky-700 text-white p-4 font-bold text-xl hover:bg-sky-800 pointer-events-auto w-[220px]'>
                                Create a draft post
                            </div>
                        </div>
                        <div className='h-[calc(100%-125px)] sm:h-[calc(100%-40px)] w-full overflow-auto'>
                            <div className='divide-y'>
                                <div className='overflow-auto'>
                                    {
                                        draftPosts.map((draftPost: any) => <div ref={scrollRef} key={draftPost.draftPostId} className='bg-neutral-100 mx-4 py-4'>
                                            <div className='pl-4 font-bold'>{timeAgo.format(new Date(draftPost.updatedAt))}</div>
                                            <DraftPost draftPost={draftPost} handleClickUpdateDraftPost={handleClickUpdateDraftPost} handleClickDeleteDraftPost={handleClickDeleteDraftPost} />
                                        </div>
                                        )
                                    }
                                </div>
                                {
                                    clickCreateDraftPost ?
                                        <div ref={scrollRef}>
                                            <CreateDraftPostForm />
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

export default Draft