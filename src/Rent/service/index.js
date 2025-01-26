import { client } from "../../shared/api/client";

export const googleLoginApi = async (code) => {
  return await client.get(`/google?code=${code}`);
};

export const getAllTenants = async () => {
  return await client.get(`/all-flats`).then((res) => res.data);
};

export const getTenantDetails = async (sheetId, page = 1) => {
  return await client
    .get(`/recent-entries?sheet=${sheetId}&page=${page}`)
    .then((res) => res.data);
};

export const createNewEntry = async (data) => {
  return await client.post(`/add-rent-entry`, { ...data });
};
