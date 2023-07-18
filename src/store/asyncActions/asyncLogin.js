import { $authHost } from "../api/api";
import { actionLogIn } from "../reducers/userReducer";
import jwt_decode from "jwt-decode";

export const postLogin = (login, password) => async (dispatch) => {
  const { data } = await $authHost.post("/api/admin/login", {
    login,
    password,
  });
  localStorage.token = data.token;
  const res = dispatch(actionLogIn(jwt_decode(data.token)));
  return res;
};
