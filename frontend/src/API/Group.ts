import axios from "axios";

export const APIfetchAllGroups = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("http://localhost:3001/api/group", config);
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

export const APIgetGroupByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("http://localhost:3001/api/group/" + groupId, config);
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

export const APIupdateGroupAvatar = async (avatar: any) => {
    try {
        const data = new FormData();
        const fileName = Date.now() + avatar.name;
        data.append("name", fileName);
        data.append("file", avatar);
        console.log(avatar)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("http://localhost:3001/api/group/updateAvatar", data, config);
        return {
            status: true,
            data: fileName
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};