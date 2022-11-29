import axios from "axios";

interface postCreateInterface {
    groupId: string,
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
        await axios.post("http://localhost:3002/api/post/", postCreate, config);
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

export const APIdeletePost = async (postId : string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete("http://localhost:3002/api/post/" + postId, config);
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
        const res = await axios.get("http://localhost:3002/api/post/group/"+ groupId,config);
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