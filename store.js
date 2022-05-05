import { createStore,combineReducers,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

let compose;
// Reducers
import DogCollection from "./reducers/dog_collection_reducer";
import NotificationReducer from "./reducers/notification-reducer";
import ParkCollection from './reducers/ParkReducer';
import PackCollection from './reducers/PackCollection';

// Sagas
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

// Middlewares
const middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    dogCollection: DogCollection,
    parkCollection: ParkCollection,
    packCollection: PackCollection,
    notifications: NotificationReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
export {store};