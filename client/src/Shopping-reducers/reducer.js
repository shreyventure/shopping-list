const initialState = {
  socket: null,
  loading: false,
  roomNo: null,
  shoppingList: [],
  name: "",
  users: [],
  showUsers: true,
};

export const LOADING_TRUE = "LOADING_TRUE";
export const LOADING_FALSE = "LOADING_FALSE";
export const NEW_ROOM_NO = "NEW_ROOM_NO";
export const SET_SOCKET = "SET_SOCKET";
export const SET_SHOPPING_LIST = "SET_SHOPPING_LIST";
export const SET_NAME = "SET_NAME";
export const LOGOUT = "LOGOUT";
export const SET_USERS = "SET_USERS";
export const SET_SHOW_USERS = "SET_SHOW_USERS";

export const shoppingReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.value };
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case NEW_ROOM_NO:
      return { ...state, roomNo: action.value };
    case SET_SHOPPING_LIST:
      return { ...state, shoppingList: action.value };
    case SET_NAME:
      return { ...state, name: action.value };
    case SET_USERS:
      return { ...state, users: action.value };
    case SET_SHOW_USERS:
      return { ...state, showUsers: action.value };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
