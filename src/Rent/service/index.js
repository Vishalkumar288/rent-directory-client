import { client } from "../../shared/api/client";

export const googleLoginApi = async (token) => {
  console.log(token)
  return await client.post(`/google`, {
    access_token: token
  });
};

export const getAllTenants = async () => {
  return await client.get(`/all-flats`).then((res) => res.data);
};

export const getAmounts = async (params) => {
  return await client
    .get(`/amount`, { params: { ...params } })
    .then((res) => res.data);
};

export const getTenantDetails = async (sheetId, page = 1) => {
  return await client
    .get(`/recent-entries?sheet=${sheetId}&page=${page}`)
    .then((res) => res.data);
};

export const createNewEntry = async (data) => {
  return await client.post(`/add-rent-entry`, { ...data });
};
export const updateEntry = async (data) => {
  return await client.put(`/amount`, { ...data });
};
