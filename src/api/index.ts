import axios, { AxiosResponse } from "axios";

// Create an instance of axios with a base URL of "http://localhost:5000"
const API = axios.create({ baseURL: "https://azureihlstest.azurewebsites.net", timeout: 5000 });

/**
 * Fetches a clause from the API.
 * @param endpoint - The endpoint to fetch the clause from.
 * @returns A promise that resolves with the fetched clause.
 */
export const fetchClause = async (endpoint: string): Promise<AxiosResponse> => {
  return await API.get(`/${endpoint}`);
};

/**
 * Creates a new clause on the API.
 * @param endpoint - The endpoint to create the clause on.
 * @param newPost - The new clause to create.
 * @returns A promise that resolves with the created clause.
 */
export const createClause = async (endpoint: string, newPost: object): Promise<AxiosResponse> => {
  return await API.post(`/${endpoint}`, newPost);
};

/**
 * Updates an existing clause on the API.
 * @param endpoint - The endpoint to update the clause on.
 * @param id - The ID of the clause to update.
 * @param updatedPost - The updated clause.
 * @returns A promise that resolves with the updated clause.
 */
export const updateClause = async (endpoint: string, id: string, updatedPost: object): Promise<AxiosResponse> => {
  return await API.patch(`/${endpoint}/${id}`, updatedPost);
};

/**
 * Deletes an existing clause from the API.
 * @param endpoint - The endpoint to delete the clause from.
 * @param id - The ID of the clause to delete.
 * @returns A promise that resolves when the clause is deleted.
 */
export const deleteClause = async (endpoint: string, id: string): Promise<void> => {
  await API.delete(`/${endpoint}/${id}`);
};

export default API;
