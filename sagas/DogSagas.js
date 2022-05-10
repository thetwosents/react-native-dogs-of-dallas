import { eventChannel, END } from 'redux-saga'
import { all, call, put, take, fork, takeEvery } from 'redux-saga/effects'
import { ref, set, onValue, get, child } from 'firebase/database'
import db from '../firebase'

let DogSagaObject = {
  watchAddDog,
  watchGetMyDogs,
  watchRemoveDog,
  watchAddDogToCollection,
}

const watchAddDog = function *() {
  let payload = yield take('ADD_DOG')
  try {
    yield call(addDog, payload.dog)
  } catch (error) {
    yield put({ type: 'ADD_DOG_FAILURE', error })
  }
}

// Watch for REMOVE DOG
const watchRemoveDog = function *() {
  let payload = yield take('REMOVE_DOG')
  try {
    yield call(removeDog, payload.dog)
    yield put({ type: 'REMOVE_DOG_SUCCESS' })
  } catch (error) {
    yield put({ type: 'REMOVE_DOG_FAILURE', error })
  }
}

function addDog(dog) {
  set(ref(db, 'dogs/' + Math.random().toString(36).substr(2, 9)), dog);
}

function addDogToCollection(payload) {
  let user = payload.user;
  let dog = payload.dog;
  set(ref(db, 'users/' + user.uid + '/myDogs/' + dog.id), true);
}


const watchGetMyDogs = function *() {
  let payload = yield take('GET_MY_DOGS')
  let dogs = yield call(getByIds,payload.user.myDogs);
  yield put({ type: 'GET_MY_DOGS_SUCCESS', dogs })
}

const watchAddDogToCollection = function *() {
  try {
    let payload = yield takeEvery('ADD_DOG_TO_COLLECTION', addDogToCollection);
    yield put({ type: 'ADD_DOG_TO_COLLECTION_SUCCESS', payload });
  } catch (error) {
    yield put({ type: 'ADD_DOG_TO_COLLECTION_FAILURE', error })
  }
}

async function getByIds(ids) {
  let collection = 'dogs';
  let keys = Object.keys(ids);
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

module.exports = DogSagaObject;
