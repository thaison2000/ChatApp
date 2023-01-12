import axios from "axios";
import { send } from "process";

interface friendRequestNotificationInterface {
  sendUserId: number,
  receiveUserId: number,
  sendUserName: string,
  type: number
}

export const APIcreateFriendRequestNotification = async (friendRequestNotification: friendRequestNotificationInterface) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/notification/friendRequest", friendRequestNotification, config);
    return {
      status: true
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIcreateNotification = async ({sendUserId, receiveUserId, sendUserName, type, groupId, groupName, affectedUserName}: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/notification/",{
      sendUserId, receiveUserId, sendUserName, type, groupId, groupName, affectedUserName
    }, config);
    return {
      status: true
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIdeleteNotification = async (sendUserId: number, receiveUserId: number, type: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.delete(`${process.env.REACT_APP_SERVER2_URL}` + "/api/notification/" + sendUserId + '/' + receiveUserId + '/' + type , config);
    return {
      status: true
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIgetAllNotificationsByReceiveUserId = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    const req = await axios.get(`${process.env.REACT_APP_SERVER2_URL}` + "/api/notification/", config);
    return {
      status: true,
      data: req.data
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIgetAllNotificationsByGroupIds = async (groups: Array<any>) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    const req = await axios.post(`${process.env.REACT_APP_SERVER2_URL}` + "/api/notification/groups/",{groups}, config);
    return {
      status: true,
      data: req.data
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}