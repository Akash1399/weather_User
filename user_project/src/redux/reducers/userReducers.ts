// src/reducers/userReducer.ts
import { REGISTER_USER, User } from "../types/userTypes";

interface Action {
  type: string;
  payload: User;
}

const initialState: User[] = [];

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case REGISTER_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userReducer;
