import axios from "axios";

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
    await axios.post("http://localhost:3002/api/notification/friendRequest", friendRequestNotification, config);
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
    await axios.delete("http://localhost:3002/api/notification/" + sendUserId + '/' + receiveUserId + '/' + type , config);
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
    const req = await axios.get("http://localhost:3002/api/notification/", config);
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