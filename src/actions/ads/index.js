import {
  ADSADDNEW,
  ADSBUSYSTATE,
  ADSREADYSTATE,
  ADSERRORSTATE,
  ADSFETCHEND
} from '../../constants/actions';


export const addNew = () => ({
  type: ADSADDNEW
});

export const markBusy = idx => ({
  type: ADSBUSYSTATE,
  payload: {
    idx
  }
});

export const markReady = idx => ({
  type: ADSREADYSTATE,
  payload: {
    idx
  }
});

export const markError = idx => ({
  type: ADSERRORSTATE,
  payload: {
    idx
  }
});

export const fetchEnd = (data, idx) => ({
  type: ADSFETCHEND,
  payload: {
    data,
    idx
  }
});

export const fetchAdd = (idx) => function (dispatch) {
  dispatch(addNew());
  dispatch(markBusy(idx));

  let adId = Math.floor(Math.random()*1000);
  const prevId = localStorage.getItem("adId");
  while ( adId === prevId ) {
    adId = Math.floor(Math.random()*1000);
  }
  localStorage.setItem("adId", adId);

  return fetch(`${process.env.HOSTNAME}/ads/?r=${adId}`, {
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
      dispatch(fetchEnd(data, idx));
      dispatch(markReady(idx));  
    })
    .catch((err) => {
      dispatch(markError(idx));
      dispatch(markReady(idx));  
    });
};
