/**
 * Create a reducer.
 *
 * @method createReducer
 * @public
 *
 * @param  {Object} initialState The initial state for the reducer
 * @param  {Object} reducerMap   The reducer object
 *
 * @return {Object} the reducer
 */
export default function (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer
      ? reducer(state, action.payload, action.meta)
      : state;
  };
}
