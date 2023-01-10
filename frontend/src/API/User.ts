import axios from "axios";

interface userProfileUpdateInterface {
    name: string,
    dateOfBirth: string
    phone: string
    address: string
    gender: string
}

export const APIgetUserProfile = async (userId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/user/" + userId, config)
        return {
            status: true,
            data: res.data
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIupdateUserProfile = async (userProfileUpdate: userProfileUpdateInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put("https://chatapp-server1-y5cc.onrender.com/api/user/", userProfileUpdate, config);
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
};

export const APIupdateUserAvatar = async (avatar: any) => {
    try {
        const data = new FormData();
        const fileName = Date.now() + avatar.name;
        data.append("name", fileName);
        data.append("file", avatar);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server1-y5cc.onrender.com/api/user/updateAvatar", data, config);
        return {
            status: true,
            data: fileName
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIfindUserByName = async (name: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/user?name=" + name, config);
        return {
            data: res.data,
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
};
