import { client } from "../../shared/api/client";

export const googleLoginApi = async (token) => {
  return await client.post(`/google`, {
    access_token: token
  });
};

export const demoUserLogin = async () => {
  return await client.post(`/demo-user`, {});
};

export const getFormData = async () => {
  return await client.get(`/tenants/formData`).then((res) => res.data);
};

export const getFinancialTotal = async (params) => {
  return await client
    .get(`/tenants/financial-total`, { params: { ...params } })
    .then((res) => res.data);
};

export const getAllTenants = async (params) => {
  return await client
    .get(`/all-flats`, { params: { ...params } })
    .then((res) => res.data);
};

export const getAmounts = async (params) => {
  return await client
    .get(`/amount`, { params: { ...params } })
    .then((res) => res.data);
};

export const getTenantDetails = async (sheetId, page = 1, params) => {
  return await client
    .get(`/recent-entries?sheet=${sheetId}&page=${page}`, {
      params: { ...params }
    })
    .then((res) => res.data);
};

export const createNewEntry = async (data) => {
  return await client.post(`/add-rent-entry`, { ...data });
};
export const updateEntry = async (data) => {
  return await client.put(`/amount`, { ...data });
};
