import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/userProvider";
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocal,
  setItemToLocal,
  removeItemFromLocalStorage,
} from "../utils";
import { register, signin, addTask, editTask1, deleteTask1 } from "../api";
import jwt from "jwt-decode";

export const useAuth = () => {
  return useContext(UserContext);
};
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocal(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwt(userToken);
        console.log(user);
        setUser(user);
      }
    };
    getUser();
  }, []);

  const signup = async (body) => {
    const response = await register(body);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        sucess: false,
        message: response.message,
      };
    }
  };
  const login = async (body) => {
    const response = await signin(body);

    if (response.success) {
      setItemToLocal(LOCALSTORAGE_TOKEN_KEY, response.token);
      setUser(response.user);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  const createTask = async (body) => {
    let response = await addTask(body);
    if (response.success) {
      user.tasks.push(response.task);
      setItemToLocal(LOCALSTORAGE_TOKEN_KEY, response.token);
    }
    return response;
  };
  const editTask = async (body, id) => {
    console.log("hell");
    let response = await editTask1(body, id);
    if (response.success) {
      user.tasks.map((task) => {
        if (task._id == id) {
          task.title = body.title;
          task.description = body.description;
          task.status = body.status;
          task.startedAt = body.startDate;
          task.finishedAt = body.endDate;
        }
        setItemToLocal(LOCALSTORAGE_TOKEN_KEY, response.token);

        return true;
      });
    }

    return response;
  };
  const deleteTask = async (id) => {
    let response = await deleteTask1(id);
    if (response.success) {
      console.log(response);
      setItemToLocal(LOCALSTORAGE_TOKEN_KEY, response.token);
      setUser(response.user);
    }
    return response;
  };

  return {
    user,
    login,
    logout,
    signup,

    createTask,
    editTask,
    deleteTask,
  };
};
