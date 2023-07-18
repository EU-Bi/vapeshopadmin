import { $host } from "../api/api";
import {
  actionGetBrands,
  actionGetDevices,
  actionGetModels,
  actionGetTypes,
} from "../reducers/deviceReducer";

export const asyncGetBrands = () => async (dispatch) => {
  const { data } = await $host.get("/api/brand");
  const res = dispatch(actionGetBrands(data));
  return res;
};
export const asyncGetTypes = () => async (dispatch) => {
  const { data } = await $host.get("/api/type");
  const res = dispatch(actionGetTypes(data));
  return res;
};

export const asyncGetModels = () => async (dispatch) => {
  const { data } = await $host.get("/api/model");
  const res = dispatch(actionGetModels(data));
  return res;
};

export const asyncGetTastes = () => async (dispatch) => {
    const { data } = await $host.get("/api/model");
    const res = dispatch(actionGetModels(data));
    return res;
  };

export const asyncGetDevice = () => async (dispatch) => {
  const { data } = await $host.get("/api/device");
  console.log("data",data)
  const res = dispatch(actionGetDevices(data));

  return res;
};

