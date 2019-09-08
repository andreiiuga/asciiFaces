import {
  PRODUCTSBUSYSTATE, PRODUCTSREADYSTATE, PRODUCTSFETCHEND, PRODUCTSERRORSTATE
} from '../../constants/actions';

export const markBusy = () => ({
  type: PRODUCTSBUSYSTATE
});

export const markReady = () => ({
  type: PRODUCTSREADYSTATE
});

export const markError = () => ({
  type: PRODUCTSERRORSTATE
});

export const fetchEnd = data => ({
  type: PRODUCTSFETCHEND,
  payload: {
    data
  }
});

export const fetchProducts = (page, count) => function (dispatch) {
  dispatch(markBusy());
  return fetch(`${process.env.HOSTNAME}/api/products${`?_page=${11}&_limit=${50}`}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return { errorCode: response.status };
    })
    .then((data) => {
      dispatch(fetchEnd(data));
    })
    .catch((err) => {
      dispatch(markError());
    });
  dispatch(markReady());  
};
