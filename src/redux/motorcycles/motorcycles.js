import API from '../api';

export const FETCH_MOTORCYCLES = 'BOOK-APPOINTMENT/MOTORCYCLES/FETCH_MOTORCYCLES';
export const CREATE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/CREATE_MOTORCYCLE';
export const DELETE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/DELETE_MOTORCYCLE';
export const FETCH_SINGLE_MOTORCYCLE = 'BOOK-APPOINTMENT/MOTORCYCLES/FETCH_SINGLE_MOTORCYCLE';
export const UPDATE_MOTOR = 'BOOK-APPOINTMENT/MOTORCYCLES/UPDATE_MOTOR';

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
        motorcycles: [...state, action.payload],
        status: 'succeeded',
      };
    case DELETE_MOTORCYCLE:
      return {
        ...state,
        motorcycles: state.filter((motorcycle) => motorcycle.id !== action.payload),
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
        motorcycles: state.map((motor) => (motor.id === action.id
          ? {
            ...motor,
            ...action.payload,
          }
          : motor)),
        status: 'succeeded',
      };
    default:
      return state;
  }
};

export default motorcyclesReducer;
