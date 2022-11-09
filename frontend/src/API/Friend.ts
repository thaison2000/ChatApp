import axios from "axios";

export const APIdeleteFriend = async (user_id: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.delete("http://localhost:3001/api/friend/" + user_id, config);
    return { status: true }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIaddFriend = async (friendId: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.post("http://localhost:3001/api/friend/", friendId, config);
    return { status: true }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIgetAllFriends = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    const res = await axios.get("http://localhost:3001/api/friend/", config);
    return {
      status: true,
      data: res.data
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIdeleteFriendRequest = async (sendUserId: number, receiveUserId: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.delete("http://localhost:3001/api/friend/request/" + sendUserId + '/' + receiveUserId, config);
    return { status: true }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIcreateFriendRequest = async (receiveUserId: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.post("http://localhost:3001/api/friend/request/", {receiveUserId}, config);
    return { status: true }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIgetAllFriendRequestBySendUserId = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    const res = await axios.get("http://localhost:3001/api/friend/request/sendUser/", config);
    return {
      status: true,
      data: res.data
    }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

