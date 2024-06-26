import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasks/slice';
import authReducer from './auth/slice';
import filtersReducer from './filters/slice';

const tasksPersistConfig = {
  key: 'activeBoardId',
  storage,
  whitelist: ['activeBoardId'],
};
const persistedBoardsReducer = persistReducer(tasksPersistConfig, tasksReducer);

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const filtersPersistConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);

export const store = configureStore({
  reducer: {
    tasks: persistedBoardsReducer,
    auth: persistedAuthReducer,
    filter: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
