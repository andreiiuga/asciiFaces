import createReducer from '../../utils/createReducer';
import { saveData, removeData } from './dataHandle';
import {
  PRODUCTSBUSYSTATE, PRODUCTSFETCHEND, PRODUCTSREADYSTATE, PRODUCTSERRORSTATE
} from '../../constants/actions';

/**
 * The initial state.
 * @type {Object}
 */
const initialState = {
  displayedItems: [],
  toBeDisplayedItems: [],
  loading: false,
  error: false
};

const markBusy = state => ({
  ...state,
  loading: true,
  error: false
});

const markReady = state => ({
  ...state,
  loading: false
});

const markError = state => ({
  ...state,
  error: true
});

const endFetch = (state, payload) => ({
  ...state,
  displayedItems: payload.data
});

const endFetchT = (state, payload) => ({
  ...state,
  displayedItems: payload.data
});


export const products = createReducer(initialState, {
  [PRODUCTSBUSYSTATE]: markBusy,
  [PRODUCTSREADYSTATE]: markReady,
  [PRODUCTSERRORSTATE]: markError,
  [PRODUCTSFETCHEND]: endFetch
});
