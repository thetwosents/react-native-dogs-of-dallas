import { eventChannel, END } from 'redux-saga'
import { all, call, put, take, fork, takeEvery } from 'redux-saga/effects'
import { ref, set, onValue, get, child, update } from 'firebase/database'
import db from './firebase'

function* listenForDogs() {
  let path = ref(db, 'dogs');

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path, (snapshot) => {
      let dogs = Object.keys(snapshot.val()).map(key => {
        return {
          ...snapshot.val()[key],
          id: key,
        };
      });
      emitter({ type: 'GET_DOGS_SUCCESS', dogs });
    });
    return () => { };
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* listenForParks() {
  let path = ref(db, 'parks');

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path, (snapshot) => {

      // Get the object.keys make the response an array
      let parks = Object.keys(snapshot.val()).map(key => {
        return {
          ...snapshot.val()[key],
          id: key,
        };
      });
      emitter({ type: 'GET_PARKS_SUCCESS', parks });
    });
    return () => { };
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* listenForUser() {
  let path = ref(db, 'users/bjWXG02u8XQhbYZtr9T0qXexA4x2');

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path, (snapshot) => {

      emitter({ type: 'GET_USER', user: snapshot.val() });
    }
    );
    return () => { };
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

/*
Watchers
*/

function* watchCheckInAtPark() {
  yield takeEvery('CHECK_IN_AT_PARK', checkInAtPark);
}

function* checkInAtPark(action) {
  let dog = {};
  dog.timestamp = new Date().getTime();
  yield call(set, ref(db, `parks/${action.parkId}/dogs/${action.dogId}`), dog);
  // Update selected park
  let parkSnapshot = yield call(get, ref(db, 'parks/' + action.parkId));
  let park = parkSnapshot.val();
  yield put({ type: 'GET_PARK_BY_ID_SUCCESS', park });
}

function* watchAddDog() {
  let payload = yield take('ADD_DOG')
  try {
    yield call(addDog, payload.dog)
  } catch (error) {
    yield put({ type: 'ADD_DOG_FAILURE', error })
  }
}


// Watch for REMOVE DOG
function* watchRemoveDog() {
  let payload = yield take('REMOVE_DOG')
  try {
    yield call(removeDog, payload.dog)
    yield put({ type: 'REMOVE_DOG_SUCCESS' })
  } catch (error) {
    yield put({ type: 'REMOVE_DOG_FAILURE', error })
  }
}

function* watchGetParkById() {
  let payload = yield takeEvery('GET_PARK_BY_ID', getParkById);
}

function* watchAddParkToCollection() {
  let payload = yield takeEvery('ADD_PARK_TO_COLLECTION', addParkToCollection);
}

function* watchConnectDog() {
  let payload = yield takeEvery('CONNECT_DOG', connectDog);
}

function* connectDog(action) {
  console.log('connect dog', action);
  let sender = action.sender;
  let receiver = action.receiver;

  let updates = {};
  updates[`/dogs/${receiver}/connections/${sender}`] = true;
  updates[`/dogs/${sender}/connections/${receiver}`] = true;

  yield call(update, ref(db), updates);

  yield put({ type: 'CONNECT_DOG_SUCCESS' });
}

function* addParkToCollection(action) {
  console.log('add park to collection', action);
  let path = ref(db, `users/${action.user}/parks/${action.park.id}`);
  yield call(set, path, true);
  // Get park by id
  let parkSnapshot = yield call(get, ref(db, 'parks/' + action.park.id));
  yield put({ type: 'ADD_PARK_TO_COLLECTION_SUCCESS', park: parkSnapshot.val() });
}

function* getParkById(action) {
  let parkId = action.parkId;
  let parkSnapshot = yield call(get, ref(db, 'parks/' + parkId));
  let park = parkSnapshot.val();

  if (park.dogs) {
    let dogs = yield call(getByIds, {collection: 'dogs', items:park.dogs});
    dogs.map(dog => {
      // get the timestamp from park.dogs
      let timestamp = park.dogs[dog.id].timestamp;
      dog.timestamp = timestamp;
      return dog; 
    })

    park.dogs = dogs;
  }

  yield put({ type: 'GET_PARK_BY_ID_SUCCESS', park });
}

function* watchGetMyDogs() {
  let payload = yield take('GET_MY_DOGS')
  let dogs = yield call(getByIds,{collection: 'dogs', items:payload.user.myDogs});
  yield put({ type: 'GET_MY_DOGS_SUCCESS', dogs })
}

function* watchGetMyParks() {
  let payload = yield take('GET_MY_PARKS')
  let parks = yield call(getByIds,{collection: 'parks',items:payload.user.myParks});
  yield put({ type: 'GET_MY_PARKS_SUCCESS', parks })
}


function* watchAddDogToCollection() {
  try {
    let payload = yield takeEvery('ADD_DOG_TO_COLLECTION', addDogToCollection);
    yield put({ type: 'ADD_DOG_TO_COLLECTION_SUCCESS', payload });
  } catch (error) {
    yield put({ type: 'ADD_DOG_TO_COLLECTION_FAILURE', error })
  }
}

/*
Async functions
*/

// ids is an object with keys and true as the value
async function getByIds(object) {

  let collection = object.collection;
  let keys = Object.keys(object.items);
  let dogs = await Promise.all(keys.map(key => {
    return get(ref(db, collection + '/' + key));
  })).then(results => {
    let dogs = results.map(result => {
      return {
        ...result.val(),
        id: result.key,
      };
    })
    return dogs;
  });

  return dogs;


}
function addDog(dog) {
  set(ref(db, 'dogs/' + Math.random().toString(36).substr(2, 9)), dog);
}

function addDogToCollection(payload) {
  let user = payload.user;
  let dog = payload.dog;
  set(ref(db, 'users/' + user.uid + '/myDogs/' + dog.id), true);
}

export default function* rootSaga() {
  yield all([
    fork(listenForDogs),
    fork(listenForParks),
    fork(listenForUser),
    fork(watchAddDog),
    fork(watchGetMyDogs),
    fork(watchGetParkById),
    fork(watchRemoveDog),
    fork(watchConnectDog),
    fork(watchCheckInAtPark),
    fork(watchGetMyParks),
    fork(watchAddParkToCollection),
    fork(watchAddDogToCollection),
  ]);
}