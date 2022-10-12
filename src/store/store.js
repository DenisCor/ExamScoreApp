import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from '@reduxjs/toolkit'
import studentsReducer from './features/students/studentsSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'students',
  version:1,
  storage,
}




const reducer = combineReducers({
  students: studentsReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
})