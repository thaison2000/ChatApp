import axios from "axios";

interface companyProfileUpdateInterface {
    name: string,
    desc: string,
    companyId: any
}

export const APIgetCompanyUsers = async (companyId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/company/users/" + companyId, config)
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

export const APIgetCompanyProfile = async (companyId: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/company/" + companyId, config)
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

export const APIupdateCompanyProfile = async (companyProfileUpdate: companyProfileUpdateInterface) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.put(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/company/", companyProfileUpdate, config);
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

export const APIupdateCompanyAvatar = async (avatar: any, companyId: any) => {
    try {
        const data = new FormData();
        const fileName = Date.now() + avatar.name;
        data.append("companyId", companyId);
        data.append("name", fileName);
        data.append("file", avatar);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
            },
        }
        await axios.post(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/company/updateAvatar", data, config);
        return {
            status: true,
            data: fileName
        }
    } catch (err) {
        console.log(err)
        return {status: false}
    }
};

