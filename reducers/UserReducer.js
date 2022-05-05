const initialState = {
  myDogs: [],
  myPacks: [],
  myParks: []
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACCOUNT':
      return {
        ...state,
        myDogs: action.myDogs,
        myPacks: action.myPacks,
        myParks: action.myParks,
      };
      default:
        return state;
    }
  }
  export default UserReducer;