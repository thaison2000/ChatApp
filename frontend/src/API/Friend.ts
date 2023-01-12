import axios from "axios";

export const APIdeleteFriend = async (userId: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.delete(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/" + userId, config);
    return { status: true }
  }
  catch (err) {
    console.log(err)
    return { status: false }
  }
}

export const APIaddFriend = async (friendId: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    await axios.post(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/", {friendId}, config);
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
    const res = await axios.get(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/", config);
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
    await axios.delete(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/request/" + sendUserId + '/' + receiveUserId, config);
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
    await axios.post(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/request/", {receiveUserId}, config);
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
    const res = await axios.get(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/request/sendUser/", config);
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

export const APIgetAllFriendRequestByReceiveUserId = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
      },
    }
    const res = await axios.get(`${process.env.REACT_APP_SERVER1_URL}` + "/api/friend/request/receiveUser/", config);
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

