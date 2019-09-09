import {
  PRODUCTSBUSYSTATE,
  PRODUCTSFETCHEND,
  PRODUCTSREADYSTATE,
  PRODUCTSERRORSTATE,
  PRODUCTSFETCHNEXTEND,
  PRODUCTSUPDATEVISIBLE
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

export const fetchNextEnd = data => ({
  type: PRODUCTSFETCHNEXTEND,
  payload: {
    data
  }
});

export const updateDisplayedItems = () => ({
  type: PRODUCTSUPDATEVISIBLE
});


export const fetchProducts = () => function (dispatch) {
  dispatch(markBusy());
  return fetch(`${process.env.HOSTNAME}/api/products?_page=1&_limit=40`, {
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
      dispatch(markReady());  
    })
    .catch((err) => {
      dispatch(markError());
      dispatch(markReady());  
    });
};

export const fetchNextProducts = (page) => function (dispatch) {
  dispatch(updateDisplayedItems());
  dispatch(markBusy());
  return fetch(`${process.env.HOSTNAME}/api/products${`?_page=${page}&_limit=40`}`, {
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
      dispatch(fetchNextEnd(data));
      dispatch(markReady());  
    })
    .catch((err) => {
      dispatch(markError());
      dispatch(markReady());  
    });
};
