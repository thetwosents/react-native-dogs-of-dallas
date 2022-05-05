import { createStore,combineReducers } from 'redux';
import DogCollection from "./reducers/dog_collection_reducer";
import NotificationReducer from "./reducers/notification-reducer";
import ParkCollection from './reducers/ParkReducer';
import PackCollection from './reducers/PackCollection';

// Combine all reducers
const store = createStore(
  combineReducers({
    dogCollection: DogCollection,
    parkCollection: ParkCollection,
    packCollection: PackCollection,
    notifications: NotificationReducer,
  }),
);
export {store};