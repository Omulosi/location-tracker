import { axiosWithAuth } from "../context/auth/auth";
import { HOST } from "../config";

// eslint-disable-next-line import/no-anonymous-default-export
export const getResource = async (url: string) => {
  const { data } = await axiosWithAuth().get(`${HOST}${url}`);
  return data;
};

export const addResource = async (url: string, resource: any) => {
  const { data } = await axiosWithAuth().post(`${HOST}${url}`, resource);
  return data;
};

export const updateResource = async (url: string, resource: any) => {
  const { data } = await axiosWithAuth().patch(`${HOST}${url}`, resource);
  return data;
};

export const deleteResource = async (url: string, reason: any) => {
  const { data } = await axiosWithAuth().delete(`${HOST}${url}`, reason);
  return data;
};
