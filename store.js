import { createStore,combineReducers,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

let compose;
// Reducers
import UserReducer from './reducers/UserReducer';
import DogCollection from "./reducers/DogReducer";
import NotificationReducer from "./reducers/notification-reducer";
import ParkCollection from './reducers/ParkReducer';
import PackCollection from './reducers/PackCollection';

// Sagas
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

// Middlewares
const middlewares = [sagaMiddleware];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    user: UserReducer,
    dogCollection: DogCollection,
    parkCollection: ParkCollection,
    packCollection: PackCollection,
    notifications: NotificationReducer,
  }),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);
export {store};