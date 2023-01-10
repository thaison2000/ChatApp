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
        await axios.post("https://chatapp-server2.onrender.com/api/comment/", createComment, config);
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
        let data = []
        const res1 = await axios.get("https://chatapp-server2.onrender.com/api/comment/" + postId, config);

        for (let i =0;i <res1.data.length;i++){
            let res2 = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/user/" + res1.data[i].userId, config)
            data.push({
                commentId: res1.data[i].commentId,
                userId: res2.data.userId,
                avatar: res2.data.avatar,
                name: res2.data.name,
                createdAt: res1.data[i].createdAt,
                content: res1.data[i].content
            })
        }
        return {
            status: true,
            data: data
        }
    }
    catch (err) {
        console.log(err)
        return { status: false }
    }
}