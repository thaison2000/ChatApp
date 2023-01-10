import axios from "axios";

export const APIfetchAllGroups = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/group", config);
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

export const APIfetchAllDirectMessageGroups = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/group/directMessage", config);
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
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/group/" + groupId, config);
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

export const APIgetDirectMessageByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/group/directMessage/" + groupId, config);
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

export const APIupdateGroupAvatar = async (avatar: any, groupId: string) => {
    try {
        const data = new FormData();
        const fileName = Date.now() + avatar.name;
        data.append("groupId", groupId);
        data.append("name", fileName);
        data.append("file", avatar);
        console.log(avatar)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server1-y5cc.onrender.com/api/group/updateAvatar", data, config);
        return {
            status: true,
            data: fileName
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIaddMemberIntoGroup = async (groupId: string, userId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server1-y5cc.onrender.com/api/group/addMember/" ,{groupId,userId}, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIdeleteMemberInGroup = async (groupId: string, userId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete("https://chatapp-server1-y5cc.onrender.com/api/group/deleteMember/" + groupId + '/' + userId, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIpromoteAdminInGroup = async (groupId: string, userId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server1-y5cc.onrender.com/api/group/promoteAdmin/",{
            groupId,userId
        }, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIgetAllMemberByGroupId = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get("https://chatapp-server1-y5cc.onrender.com/api/group/members/" + groupId, config);
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

export const APIcreateGroup = async (name: string, desc: string, type: string| undefined = undefined) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post("https://chatapp-server1-y5cc.onrender.com/api/group/",{
            name,
            desc,
            type
          }, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};

export const APIdeleteGroup = async (groupId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.delete("https://chatapp-server1-y5cc.onrender.com/api/group/" + groupId, config);
        return {
            status: true
        }
    }
    catch (err) {
        console.log(err)
        return {status: false}
    }
};
