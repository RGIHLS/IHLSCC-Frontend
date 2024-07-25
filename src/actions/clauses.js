import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
import * as api from "../api/index.ts";

/**
 * Action creator that fetches all clauses from the server.
 * @returns {Function} A function that dispatches an action to the store.
 */
export const getClauses = async (endpoint) => {
  try {
    console.log("getClauses action creator called");
    const { data } = await api.fetchClause(endpoint);
    console.log(data, "data from getClauses action creator");

    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Action creator that creates a new clause on the server.
 * @param {string} endpoint - The endpoint to create the clause at.
 * @param {object} clause - The clause to create.
 * @returns {Function} A function that dispatches an action to the store.
 */
export const createClause = (endpoint, clause) => async (dispatch) => {
  try {
    const { data } = await api.createClause(endpoint, clause);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Action creator that updates an existing clause on the server.
 * @param {string} endpoint - The endpoint to update the clause at.
 * @param {string} id - The ID of the clause to update.
 * @param {object} clause - The updated clause.
 * @returns {Function} A function that dispatches an action to the store.
 */
export const updateClause = (endpoint, id, clause) => async (dispatch) => {
  try {
    const { data } = await api.updatedClause(endpoint, id, clause);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Action creator that deletes an existing clause from the server.
 * @param {string} endpoint - The endpoint to delete the clause from.
 * @param {string} id - The ID of the clause to delete.
 * @returns {Function} A function that dispatches an action to the store.
 */
export const deleteClause = (endpoint, id) => async (dispatch) => {
  try {
    await api.deleteClause(endpoint, id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
