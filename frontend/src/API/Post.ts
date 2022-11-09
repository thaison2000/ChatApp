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

    }
    catch (err) {
        console.log(err)
    }
}