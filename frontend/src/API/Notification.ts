import axios from "axios";

interface friendRequestNotificationInterface {
    sendUserId: number,
    receiveUserId: number,
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
      await axios.post("http://localhost:3001/api/notification/",friendRequestNotification, config);
      return {
        status: true
      }
    }
    catch (err) {
      console.log(err)
      return { status: false }
    }
  }