import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from '../types';

const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
};

const handlers = {
  [LOAD_POSTS]: (state, { payload }) => ({
    ...state,
    allPosts: payload,
    bookedPosts: payload.filter(post => post.booked),
    loading: false,
  }),
  [TOGGLE_BOOKED]: (state, { payload }) => {
    const allPosts = state.allPosts.map(post => post.id === payload
      ? { ...post, booked: !post.booked}
      : post);
    return { ...state, allPosts, bookedPosts: allPosts.filter(post => post.booked) };
  },
  [REMOVE_POST]: (state, { payload }) => ({
    ...state,
    allPosts: state.allPosts.filter(p => p.id !== payload),
    bookedPosts: state.bookedPosts.filter(p => p.id !== payload)
  }),
  [ADD_POST]: (state, { payload }) => ({
    ...state,
    allPosts: [{ ...payload }, ...state.allPosts],
  }),
  DEFAULT: state => state,
};

export const postReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}