import axios from "axios";

interface postCreateInterface {
    groupId: string,
    content: string,
    fileNames: Array<any>
}

interface draftPostCreateInterface {
    content: string
}

export const APIcreatePost = async (postCreate: postCreateInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/", postCreate, config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIupdatePost = async (postId: string, content: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/" + postId,{content}, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIactiveImportantPost = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/active/" + postId,{}, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIinactiveImportantPost = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/inactive/" + postId,{}, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIupdateAllUnreadPostByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/unreadPosts/" + groupId,{}, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIcreateDraftPost = async (draftPostCreate: draftPostCreateInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/draftPost/", draftPostCreate, config);
        return {
            status: true,
             data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIupdateDraftPost = async (draftPostId: string, draftPostCreate: draftPostCreateInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/draftPost/" + draftPostId, draftPostCreate, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIdeletePost = async (postId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/" + postId, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIdeletePostByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/group/" + groupId, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIdeleteDraftPost = async (postId: string) => {
    console.log(postId)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/draftPost/" + postId, config);
        return {
            status: true
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetAllPostByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/group/" + groupId, config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetAllUnreadPosts = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/unreadPosts" , config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetAllImportantPostByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/group/important/" + groupId, config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetAllDraftPostByUserId = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/draftPost/", config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetAllMentionPostByUserId = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/mention/", config);
        return {
            status: true,
            data: res.data
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIgetPostThread = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res1 = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/post/thread/", config);

        let postThread = res1.data

        console.log(postThread)

        for (let i = 0; i < postThread.length; i++) {
            let res2 = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/group/" + postThread[i].groupId, config);
            let res3 = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/user/" + postThread[i].userId, config)
            let res4 = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/comment/" + postThread[i].postId, config);
            if (res2.data && res3.data && res4.data) {
                postThread[i].groupName = res2.data.name
                postThread[i].groupAvatar = res2.data.avatar
                postThread[i].userName = res3.data.name 
                postThread[i].userAvatar = res3.data.avatar 
                postThread[i].comment = res4.data
            }
            for(let j=0;j<postThread[i].comment?.length;j++){
                let res5 = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/user/" + postThread[i].comment[j].userId, config)
                if(res5.data){
                    postThread[i].comment[j].userName = res5.data.name
                    postThread[i].comment[j].userAvatar = res5.data.avatar
                }
            }
        }
        postThread = postThread.sort((p1: any, p2: any) => {
            let time1: any = new Date(p2.createdAt)
            let time2: any = new Date(p1.createdAt)
            return (time2 - time1);
        })
        return {
            status: true,
            data: postThread
        }

    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}

export const APIuploadDocs = async (files: any, postId: any, userId: any, type: any) => {
    try {
        let fileNames: Array<string> = []

        const data = new FormData();

        data.append("postId", postId);
        data.append("type", type);
        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
          }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post(`${process.env.REACT_APP_SERVER2_URL}`    + "/api/post/uploadDocs", data, config);
        return {
            status: true
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};