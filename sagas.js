import { eventChannel, END } from 'redux-saga'
import { all, call, put,take,fork } from 'redux-saga/effects'
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

export default function* rootSaga() {
  yield all([
    fork(listenForDogs),
    fork(watchAddDog),
    fork(watchRemoveDog),
  ]);
}