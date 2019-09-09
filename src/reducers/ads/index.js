import createReducer from '../../utils/createReducer';
import {
  ADSADDNEW,
  ADSBUSYSTATE,
  ADSREADYSTATE,
  ADSERRORSTATE,
  ADSFETCHEND
} from '../../constants/actions';

/**
 * The initial state.
 * @type {Object}
 */
const initialState = {
  ads: []
};

const newAd = state => ({
  ads: (function() {
    const { ads } = state;

    ads.push({
      loading: false,
      error: false,
      content: {}
    });
    return ads;
  }());
});

const markBusy = (state, payload) => ({
  ads: (function() {
    const { ads } = state;

    ads[payload.idx].loading = true;
    return ads;
  }());
});

const markReady = (state, payload) => ({
  ads: (function() {
    const { ads } = state;

    ads[payload.idx].loading = false;
    return ads;
  }());
});

const markError = (state, payload) => ({
  ads: (function() {
    const { ads } = state;

    ads[payload.idx].error = true;
    return ads;
  }());
});

const endFetch = (state, payload) => ({
  ads: (function() {
    const { ads } = state;

    ads[payload.idx].content = payload.data;
    return ads;
  }());
});

export const products = createReducer(initialState, {
  [ADSADDNEW]: newAd,
  [ADSBUSYSTATE]: markBusy,
  [ADSREADYSTATE]: markReady,
  [ADSERRORSTATE]: markError,
  [ADSFETCHEND]: endFetch
});
