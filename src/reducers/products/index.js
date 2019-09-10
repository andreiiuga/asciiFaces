import createReducer from '../../utils/createReducer';
import {
  PRODUCTSCLEAR,
  PRODUCTSBUSYSTATE,
  PRODUCTSFETCHEND,
  PRODUCTSREADYSTATE,
  PRODUCTSERRORSTATE,
  PRODUCTSFINISHEDSTATE,
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
  error: false,
  finished: false
};

const clearItems = () => ({
  ...initialState
})

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

const markFinished = state => ({
  ...state,
  finished: true
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
  [PRODUCTSCLEAR]: clearItems,
  [PRODUCTSBUSYSTATE]: markBusy,
  [PRODUCTSREADYSTATE]: markReady,
  [PRODUCTSERRORSTATE]: markError,
  [PRODUCTSFINISHEDSTATE]: markFinished,
  [PRODUCTSFETCHEND]: endFetch,
  [PRODUCTSFETCHNEXTEND]: endFetchNextData,
  [PRODUCTSUPDATEVISIBLE]: updateDisplayedItems
});
