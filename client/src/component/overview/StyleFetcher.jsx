import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AppContext from '../AppContext';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { styles: [], loading: true };
    case ACTIONS.GET_DATA:
      return { ...state, styles: action.payload.styles.results, loading: false };
    case ACTIONS.ERROR:
      return {
        ...state, styles: [], loading: false, err: action.payload.err,
      };
    default:
      return state;
  }
}
//TEST WWEWEEEEEEEEEE

const StyleFetcher = () => {
  const myContext = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, { styles: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios.get('/products/styles', {
      params: {
        id: myContext.productId,
      },
    })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { styles: res.data } });
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
  }, []);
  return state;
};

export default StyleFetcher;
