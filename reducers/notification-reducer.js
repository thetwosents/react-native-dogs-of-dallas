// A notification system with a reducer
const initialState = {
  notifications: [],
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    case 'REMOVE_NOTIFICATION':
      // Remove by index in the array
      return {
        ...state,
        notifications: [
          ...state.notifications.slice(0, action.index),
          ...state.notifications.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}

export default NotificationReducer;