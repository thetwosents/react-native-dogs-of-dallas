const initialState = {
  dogCollection: [],
};

const DogCollection = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DOG':
      const dogId = Math.random().toString(36).substring(7);

      action.dog.id = dogId;
      return {
        ...state,
        dogCollection: [...state.dogCollection, action.dog],
      };
    case 'UPDATE_DOG':
      // Update the dog in the array
      return {
        ...state,
        dogCollection: state.dogCollection.map(dog => {
          if (dog.id === action.dog.id) {
            // Update the dog
            return action.dog;
          }
          return dog;
        }),
      };
    case 'REMOVE_DOG':
      // Remove by index in the array
      return {
        ...state,
        dogCollection: [
          ...state.dogCollection.slice(0, action.index),
          ...state.dogCollection.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default DogCollection;