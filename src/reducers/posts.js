import { 
  FETCH_POSTS_END,
  FETCH_POST,
  DETELE_POST,
  UPDATED_POST
 } from '../actions/types';
const updatePost = (state, action) => state.map((post) => 
  post.id !== action.payload.id ? post : action.payload)

export function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_END:
      const stateMap = {};
      [...state, ...action.payload].forEach(post => stateMap[post.id] = post)
      return [...Object.values(stateMap)]
    case FETCH_POST:
      const isNew = !state.find(({id}) => id === action.payload.id)
      return isNew ? 
        [...state, action.payload] : 
        updatePost(state, action)
    case UPDATED_POST:
      return updatePost(state, action)
    case DETELE_POST:
      return [...state.filter(({id}) => id !== action.payload.id)]
    default:
      return state;
  }
}