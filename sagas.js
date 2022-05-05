import { eventChannel, END } from 'redux-saga'
import { all, call, put,take,fork,takeEvery } from 'redux-saga/effects'
import {ref, set,onValue} from 'firebase/database'
import db from './firebase'

// A listener for firebase as a channel
function* listenForDogs() {
  let path = ref(db, 'dogs');

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path,(snapshot) => {

      // Get the object.keys make the response an array
      let dogs = Object.keys(snapshot.val()).map(key => {
        return {
          ...snapshot.val()[key],
          id: key,
        };
      });
      emitter({ type: 'GET_DOGS', dogs });
    });
    return () => {};
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

// A listener for firebase as a channel
function* listenForParks() {
  let path = ref(db, 'parks');

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path,(snapshot) => {

      // Get the object.keys make the response an array
      let parks = Object.keys(snapshot.val()).map(key => {
        return {
          ...snapshot.val()[key],
          id: key,
        };
      });
      emitter({ type: 'GET_PARKS', parks });
    });
    return () => {};
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* listenForUser() {
  let path = ref(db, 'users/' + localStorage.getItem('uid'));

  const channel = yield call(eventChannel, (emitter) => {
    onValue(path,(snapshot) => {
        
      emitter({ type: 'GET_USER', user: snapshot.val() });
    }
    );
    return () => {};
  }
  );
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* watchAddDog() {
  let payload = yield take('ADD_DOG')
  yield call(addDog, payload.dog)
  yield put({ type: 'ADD_DOG_SUCCESS' })
}

// Watch for REMOVE DOG
function* watchRemoveDog() {
  let payload = yield take('REMOVE_DOG')
  yield call(removeDog, payload.index)
  yield put({ type: 'REMOVE_DOG_SUCCESS' })
}


function addDog(dog) {
  set(ref(db, 'dogs/' + dog.id), dog);
}

function* watchAddParkToCollection() {
  console.log('watchAddParkToCollection');
  let payload = yield takeEvery('ADD_PARK_TO_COLLECTION', addParkToCollection);
  // Return the payload to the reducer
  yield put({ type: 'ADD_PARK_TO_COLLECTION_SUCCESS', payload });
} 

function *watchAddDogToCollection() {
  console.log('watchAddDogToCollection');
  let payload = yield takeEvery('ADD_DOG_TO_COLLECTION', addDogToCollection);
  // Return the payload to the reducer
  yield put({ type: 'ADD_DOG_TO_COLLECTION_SUCCESS', payload });
}

function addParkToCollection(payload) {
  let user = payload.user;
  let park = payload.park;
  set(ref(db, 'users/' + user.uid + '/myParks/' + park.id), true);
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
    fork(watchRemoveDog),
    fork(watchAddParkToCollection),
    fork(watchAddDogToCollection),
  ]);
}