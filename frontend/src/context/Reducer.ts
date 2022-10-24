const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        user: action.payload,
      };
    // case "ADDFRIEND":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       friends: [...state.user.friends, action.payload],
    //     },
    //   };   
    // case "UNFRIEND":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       friends: state.user.friends.filter(
    //         (friend) => friend !== action.payload
    //       ),
    //     },
    //   }; 
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          dateOfBirth: action.payload.dateOfBirth,
          phone: action.payload.phone,
          address: action.payload.address,
          gender: action.payload.gender
        },
      };
    case "UPDATE_AVATAR":
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.avatar
        },
      };
    default:
      return state;
  }
};

export default Reducer;