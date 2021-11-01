import { axiosWithAuth } from "./axiosClient";

// eslint-disable-next-line import/no-anonymous-default-export
export const getResource = async (url: string) => {
  const { data } = await axiosWithAuth().get(url);
  return data;
};

export const addResource = async (url: string, resource: any) => {
  const { data } = await axiosWithAuth().post(url, resource);
  return data;
};

export const updateResource = async (url: string, resource: any) => {
  const { data } = await axiosWithAuth().patch(url, resource);
  return data;
};

export const deleteResource = async (url: string, reason: any) => {
  const { data } = await axiosWithAuth().delete(url, reason);
  return data;
};
