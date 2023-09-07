// src/actions/userActions.ts
import { REGISTER_USER, User } from "../types/userTypes";

export const registerUser = (user: User) => {
  return {
    type: REGISTER_USER,
    payload: user,
  };
};
