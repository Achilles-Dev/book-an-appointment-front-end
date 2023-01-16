import API from '../api';

const FETCH_MOTORCYCLES = 'BOOK-APPOINTMENT/MOTORCYCLES/FETCH_MOTORCYCLES';
const CREATE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/CREATE_MOTORCYCLE';
const DELETE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/DELETE_MOTORCYCLE';
const FETCH_SINGLE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/FETCH_SINGLE_MOTORCYCLE';
const UPDATE_MOTOR = 'BOOK-APPOINTMENT/MOTORCYCLES/UPDATE_MOTOR';
const RESET = 'BOOK-APPOINTMENT/MOTORCYCLES/RESET';

export const fetchMotorcycles = () => (dispatch) => {
  API.fetchMotors((response) => {
    dispatch({
      type: FETCH_MOTORCYCLES,
      payload: response.data,
    });
  });
};

export const createMotorcycle = (motorcycle, userId) => (dispatch) => {
  API.addMotor(motorcycle, userId, (response) => {
    dispatch({
      type: CREATE_MOTORCYCLE,
      payload: response.data,
    });
  });
};

export const deleteMotorcycle = (id) => (dispatch) => {
  API.deleteMotor(id, (response) => {
    dispatch({
      type: DELETE_MOTORCYCLE,
      payload: id,
      message: response.data,
    });
  });
};

export const fetchSingleMotorcycle = (id) => (dispatch) => {
  API.fetchSingleMotor(id, (response) => {
    dispatch({
      type: FETCH_SINGLE_MOTORCYCLE,
      payload: response.data,
    });
  });
};

export const updateMotorcycle = (id, motorcycle) => (dispatch) => {
  API.updateMotor(id, motorcycle, (response) => {
    dispatch({
      type: UPDATE_MOTOR,
      payload: motorcycle,
      id,
      message: response.data,
    });
  });
};

export const resetMotorcycles = () => async (dispatch) => {
  await dispatch({
    type: RESET,
  });
};

const initialState = {
  motorcycles: [],
  motorcycle: {},
  status: 'idle',
};

const motorcyclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOTORCYCLES:
      return {
        ...state,
        motorcycles: action.payload,
        status: 'succeeded',
      };
    case CREATE_MOTORCYCLE:
      return {
        ...state,
        motorcycles: [...state.motorcycles, action.payload],
        status: 'succeeded',
      };
    case DELETE_MOTORCYCLE:
      return {
        ...state,
        motorcycles: state.motorcycles.filter((motorcycle) => motorcycle.id !== action.payload),
        status: 'succeeded',
      };
    case FETCH_SINGLE_MOTORCYCLE:
      return {
        ...state,
        motorcycle: action.payload,
        status: 'succeeded',
      };
    case UPDATE_MOTOR:
      return {
        ...state,
        motorcycles: state.motorcycles.map((motor) => (motor.id === action.id
          ? {
            ...motor,
            ...action.payload,
          }
          : motor)),
        status: 'succeeded',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default motorcyclesReducer;
