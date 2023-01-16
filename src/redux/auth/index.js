import API from '../api';

// To be removed
export const loadCurrentUser = (state) => state.auth.currentUser;

const LOAD_CURRENT_USER = 'auth/current_user';
const RESET = 'auth/reset';

export const setCurrentUser = (payload) => ({
  type: LOAD_CURRENT_USER,
  payload,
});

export const login = (payload) => async (dispatch) => {
  await API.login(payload, (response) => {
    dispatch(setCurrentUser(response.data));
  });
};

export const logout = () => async (dispatch) => {
  await dispatch({
    type: RESET,
  });
};

export const signup = (payload) => async (dispatch) => {
  await API.register(payload, (response) => {
    dispatch(setCurrentUser(response.data));
  });
};

const initialState = {
  currentUser: {},
  token: null,
  status: 'idle',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_USER:
      return {
        currentUser: action.payload.user,
        token: action.payload.token,
        status: 'succeeded',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
