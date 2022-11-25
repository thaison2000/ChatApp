import axios from "axios";

interface createCommentInterface {
    userId: number,
    groupId: number,
    postId: string,
    content: string
}

export const APIcreateComment = async (createComment: createCommentInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("http://localhost:3002/api/comment/", createComment, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}

export const APIgetCommentsByPostId = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("http://localhost:3002/api/comment/" + postId, config);
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