import createReducer from '../../utils/createReducer';
import {
  PRODUCTSBUSYSTATE,
  PRODUCTSFETCHEND,
  PRODUCTSREADYSTATE,
  PRODUCTSERRORSTATE,
  PRODUCTSFETCHNEXTEND,
  PRODUCTSUPDATEVISIBLE
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

const endFetchNextData = (state, payload) => ({
  ...state,
  toBeDisplayedItems: payload.data
});

const updateDisplayedItems = (state, payload) => ({
  ...state,
  displayedItems: state.displayedItems.concat(state.toBeDisplayedItems),
  toBeDisplayedItems: []
});


export const products = createReducer(initialState, {
  [PRODUCTSBUSYSTATE]: markBusy,
  [PRODUCTSREADYSTATE]: markReady,
  [PRODUCTSERRORSTATE]: markError,
  [PRODUCTSFETCHEND]: endFetch,
  [PRODUCTSFETCHNEXTEND]: endFetchNextData,
  [PRODUCTSUPDATEVISIBLE]: updateDisplayedItems
});
