import API from '../api';

export const FETCH_RESERVATIONS = 'BOOK-APPOINTMENT/RESERVATIONS/FETCH_RESERVATIONS';
export const CREATE_RESERVATION = 'BOOK-APPOINTMENT/RESERVATIONS/CREATE_RESERVATION';
export const DELETE_RESERVATION = 'BOOK-APPOINTMENT/RESERVATIONS/DELETE_RESERVATION';
export const FETCH_SINGLE_RESERVATION = 'BOOK-APPOINTMENT/RESERVATIONS/FETCH_SINGLE_RESERVATION';
export const UPDATE_RESERVATION = 'BOOK-APPOINTMENT/RESERVATIONS/UPDATE_RESERVATION';
export const RESET = 'BOOK-APPOINTMENT/RESERVATIONS/RESET';

export const fetchReservations = (userId) => (dispatch) => {
  API.fetchReservations(userId, (response) => {
    dispatch({
      type: FETCH_RESERVATIONS,
      payload: response.data,
    });
  });
};

export const createReservation = (reservation, userId, motorId) => (dispatch) => {
  API.addReservation(reservation, userId, motorId, (response) => {
    dispatch({
      type: CREATE_RESERVATION,
      payload: response.data,
    });
  });
};

export const deleteReservation = (id) => (dispatch) => {
  API.deleteReservation(id, (response) => {
    dispatch({
      type: DELETE_RESERVATION,
      payload: id,
      message: response.data,
    });
  });
};

export const fetchSingleReservation = (id) => (dispatch) => {
  API.fetchSingleReservation(id, (response) => {
    dispatch({
      type: FETCH_SINGLE_RESERVATION,
      payload: response.data,
    });
  });
};

export const updateReservation = (id, reservation) => (dispatch) => {
  API.updateReservation(id, reservation, (response) => {
    dispatch({
      type: UPDATE_RESERVATION,
      payload: reservation,
      id,
      message: response.data,
    });
  });
};

export const resetReservations = () => async (dispatch) => {
  await dispatch({
    type: RESET,
  });
};

const initialState = {
  reservations: [],
  reservation: {},
  status: 'idle',
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        status: 'succeeded',
      };
    case CREATE_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
        status: 'succeeded',
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter((reservation) => reservation.id !== action.payload),
        status: 'succeeded',
      };
    case FETCH_SINGLE_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
        status: 'succeeded',
      };
    case UPDATE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.map((reservation) => (reservation.id === action.id
          ? {
            ...reservation,
            ...action.payload,
          }
          : reservation)),
        staus: 'succeeded',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reservationsReducer;
