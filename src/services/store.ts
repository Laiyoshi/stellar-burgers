import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from './slices/user';
import ingredientReducer from './slices/ingredients';
import ordersReducer from './slices/orders';
import feedsReducer from './slices/feeds';
import builderReducer from './slices/builder';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  builder: builderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
