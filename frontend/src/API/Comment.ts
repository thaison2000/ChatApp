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
        const res = await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/comment/", createComment, config);
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

export const APIgetCommentsByPostId = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        let data = []
        const res1 = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/comment/" + postId, config);

        for (let i =0;i <res1.data.length;i++){
            let res2 = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/user/" + res1.data[i].userId, config)
            data.push({
                commentId: res1.data[i].commentId,
                userId: res2.data.userId,
                avatar: res2.data.avatar,
                name: res2.data.name,
                createdAt: res1.data[i].createdAt,
                content: res1.data[i].content,
                fileNames: res1.data[i].fileNames
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

export const APIdeleteCommentsByCommentId = async (commentId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.delete(`${process.env.REACT_APP_SERVER2_URL}` + "/api/comment/" + commentId, config);

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

export const APIcommentUploadDocs = async (files: any, commentId: any, userId: any) => {
    try {
        let fileNames: Array<string> = []

        const data = new FormData();

        data.append("commentId", commentId);
        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
          }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post(`${process.env.REACT_APP_SERVER2_URL}`    + "/api/comment/uploadDocs", data, config);
        return {
            status: true
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};