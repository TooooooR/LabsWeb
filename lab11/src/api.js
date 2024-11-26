import axios from "axios";

const BASE_URL = "http://localhost:8000";
const RESOURCE_URL = `${BASE_URL}/trees`;

const baseRequest = async ({ urlPath = "", method = "GET", data = null }) => {
  try {
    const response = await axios({
      url: `${RESOURCE_URL}${urlPath}`,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error("HTTP ERROR: ", error);
    throw error;
  }
};

export const getAllTrees = async () => {
  return await baseRequest({ method: "GET" });
};

export const searchTrees = async (searchTerm) => {
  const queryParams = `?search=${encodeURIComponent(searchTerm)}`;
  return await baseRequest({ urlPath: queryParams, method: "GET" });
};

export const getSortTrees = async (sort, searchTerm) => {
  const queryParams = `?order_by=${encodeURIComponent(sort)}&search=${encodeURIComponent(searchTerm)}`;
  return await baseRequest({ urlPath: queryParams, method: "GET" });
};

export const getTreeById = async (id) => {
  const queryParams = `/${id}`;
  return await baseRequest({ urlPath: queryParams, method: "GET" });
};