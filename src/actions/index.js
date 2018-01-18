import {
  FETCH_CATEGORIES
} from './actions';

export const onCategoriesFetched = (data) => ({
  type: FETCH_CATEGORIES,
  payload: data
});

export const fetchCategories = () => (dispatch, getState) => {
  // CONFIG maybe ?
  fetch('http://localhost:3001/categories', 
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((response) => response.json())
    .then((data) => {
      dispatch(onCategoriesFetched(data.categories));
    })

}