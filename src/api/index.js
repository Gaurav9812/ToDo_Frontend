import {
  API_URLS,
  getFormBody,
  getItemFromLocal,
  LOCALSTORAGE_TOKEN_KEY,
} from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  const token = getItemFromLocal(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      console.log(data);
      return {
        ...data,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};
export async function register(body) {
  console.log(body);
  return customFetch(API_URLS + "/users/register", {
    body,
    method: "POST",
  });
}
export async function signin(body) {
  console.log(body);
  return customFetch(API_URLS + "/users/login", {
    body,
    method: "POST",
  });
}
export async function addTask(body) {
  return customFetch(API_URLS + "/task/createTask", {
    body,
    method: "POST",
  });
}
export async function editTask1(body, id) {
  return customFetch(API_URLS + `/task/editTask/${id}`, {
    body,
    method: "POST",
  });
}
export async function deleteTask1(id) {
  return customFetch(API_URLS + `/task/deleteTask/${id}`, {
    method: "DELETE",
  });
}
