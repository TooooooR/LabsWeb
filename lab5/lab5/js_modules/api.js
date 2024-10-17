const BASE_URL = "http://localhost:8000";
const RESOURCE_URL = `${BASE_URL}/trees`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    const response = await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};

export const getAllTrees = async () => {
  return await baseRequest({ method: "GET" });
};

export const postTree = async (body) => {
  return await baseRequest({ method: "POST", body });
};

export const deleteTree = async (treeId) => {
    return await baseRequest({ urlPath: `/${treeId}`, method: "DELETE" });
};

export const updateTree = async (treeId, body) => {
    return await baseRequest({ urlPath: `/${treeId}`, method: "PUT", body });
};

export const getTotalPrice = async (search = "") => {
  const queryParams = search ? `?search=${encodeURIComponent(search)}` : "";
  return await baseRequest({ urlPath: `/total_price${queryParams}`, method: "GET" });
};

export const searchTrees = async (searchTerm) => {
  const queryParams = `?search=${encodeURIComponent(searchTerm)}`;
  return await baseRequest({ urlPath: queryParams, method: "GET" });
};

export const getSortTrees = async (sort, searchTerm) => {
  const queryParams = sort ? `?order_by=${encodeURIComponent(sort)}&search=${encodeURIComponent(searchTerm)}` : "";
  return await baseRequest({ urlPath: `${queryParams}`, method: "GET" });
};


