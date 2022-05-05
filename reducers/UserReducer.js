const initialState = {
  myDogs: {},
  myPacks: {},
  myParks: {}
};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        ...action.user
      };
      case 'GET_MY_DOGS':
      return {
        ...state,
        myDogs: action.myDogs
      };
      case 'ADD_PARK_TO_COLLECTION':
        let myParks = state.myParks;
        myParks[action.park.id] = true;
        return {
          ...state,
          myParks: myParks
        };

      case 'ADD_DOG_TO_COLLECTION':
        let myDogs = state.myDogs;
        myDogs[action.dog.id] = true;
        return {
          ...state,
          myDogs: myDogs
        };
        
      
      default:
        return state;
    }
  }
  export default UserReducer;