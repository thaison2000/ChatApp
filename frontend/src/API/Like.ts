import axios from "axios";

interface createPostLikeInterface {
    userId: number,
    groupId: number,
    postId: string
}

interface createCommentLikeInterface {
    userId: number,
    groupId: number,
    commentId: string
}

export const APIcreatePostLike = async (createPostLike: createPostLikeInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server2.onrender.com/api/like/postLike/", createPostLike, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}

export const APIcreateCommentLike = async (createCommentLike: createCommentLikeInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server2.onrender.com/api/like/commentLike/", createCommentLike, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}

export const APIdeleteLike = async (likeId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete("https://chatapp-server2.onrender.com/api/like/" + likeId, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}

export const APIgetLikesByPostId = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server2.onrender.com/api/like/post/" + postId, config);
        return {
            status: true,
            data: res.data
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}

export const APIgetLikesByCommentId = async (commentId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server2.onrender.com/api/like/comment/" + commentId, config);
        return {
            status: true,
            data: res.data
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}