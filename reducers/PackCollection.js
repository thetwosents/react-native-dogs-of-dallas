const initialState = {
  packCollection: [],
};

const PackCollection = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PACK':
      return {
        ...state,
        packCollection: [...state.packCollection, action.pack],
      };
    case 'REMOVE_PACK':
      // Remove by index in the array
      return {
        ...state,
        packCollection: [
          ...state.packCollection.slice(0, action.index),
          ...state.packCollection.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default PackCollection;