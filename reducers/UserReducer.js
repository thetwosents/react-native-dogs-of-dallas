const initialState = {
  uid: null,
  myDogs: {}, // {dogId: true}
  myPacks: {},
  myParks: {},
  signedIn: true,
  parks: [],
  dogs: [] // [dog] populated from saga 
};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        ...action.user
      };
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.dogs || []
      };
    case 'GET_MY_DOGS':
      return {
        ...state,
        dogs: action.dogs || []
      };
    case 'GET_MY_DOGS_SUCCESS':
      return {
        ...state,
        dogs: action.dogs || []
      };
    
    case 'USER_SIGNED_IN':
      return {
        ...state,
        uid: action.user.uid,
        signedIn: true
      };
    case 'ADD_PARK_TO_COLLECTION':
      let myParks = state.myParks;
      myParks[action.park.id] = true;
      return {
        ...state,
        myParks: myParks
      };
      case 'REMOVE_PARK_FROM_COLLECTION':
        return {
          ...state,
          myParks: myParks
        };
    case 'ADD_PARK_TO_COLLECTION_SUCCESS':
      return {
        ...state,
        parks: [...state.parks, action.park]
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