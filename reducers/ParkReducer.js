import {ref,set} from 'firebase/database'
import database from "../firebase";

const initialState = {
  parkCollection: [],
};

const ParkCollection = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PARKS':
      return {
        ...state,
        parkCollection: action.parks,
      };
    case 'GET_PARK_BY_ID':
      return {
        ...state,
        parkCollection: state.parkCollection.filter(park => park.id === action.parkId),
      };
    case 'ADD_PARK':
      return {
        ...state,
        parkCollection: [...state.parkCollection, action.park],
      };
    case 'CHECK_IN_AT_PARK':
      // Add timestamp to dog
      action.dog.timestamp = action.timestamp;
      action.dog.expires = new Date(action.timestamp + 1800000).getTime();
      return {
        ...state,
        parkCollection: state.parkCollection.map(park => {
          if (park.id === action.park.id) {
            return {
              ...park,
              // Update the array of dogs at the park
              dogs: [...park.dogs, action.dog],
            };
          }
          return park;
        })
      }
    case 'REMOVE_DOG_FROM_PARK':
      return {
        ...state,
        parkCollection: state.parkCollection.map(park => {
          if (park.id === action.parkId) {
            return {
              ...park,
              // Update the array of dogs at the park
              dogs: park.dogs.filter(dog => dog.id !== action.dogId),
            };
          }
          return park;
        })
      }
    case 'ADD_PARK_TO_MY_PARKS':
      return {
        ...state,
        myParks: [...state.myParks, action.park],
      };
    case 'REMOVE_PARK':
      // Remove by index in the array
      return {
        ...state,
        parkCollection: [
          ...state.parkCollection.slice(0, action.index),
          ...state.parkCollection.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default ParkCollection;