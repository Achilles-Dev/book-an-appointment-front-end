import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import sessionStorage from 'redux-persist/es/storage/session';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import authReducer from './auth';
import motorcyclesReducer from './motorcycles/motorcycles';
import reservationsReducer from './reservations/reservations';

const rootpersistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const reducer = combineReducers({
  motorcycles: motorcyclesReducer,
  auth: authReducer,
  reservations: reservationsReducer,
});

const persistedReducer = persistReducer(rootpersistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
