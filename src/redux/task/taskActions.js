import { createItem, fetchItems, updateItem, deleteItem } from "../../API/api";
import * as actionTypes from "./taskTypes";

//#region  FETCH

export const fetchTasks = (user) => {
  return (dispatch) => {
    dispatch(fetchTasksRequest());

    fetchItems(user)
      .then((response) => {
        const tasks = response.data;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const fetchTasksRequest = () => {
  return {
    type: actionTypes.FETCH_TASKS_REQUEST,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasksFailure = (error) => {
  return {
    type: actionTypes.FETCH_TASKS_FAILURE,
    payload: error,
  };
};

//#endregion

//#region UPDATE

export const updateTask = (task, user) => {
  const taskCopy = { ...task };
  delete taskCopy._id;

  return (dispatch) => {
    dispatch(updateTaskRequest(task));

    updateItem(task._id, taskCopy, user)
      .then((response) => {
        dispatch(updateTaskSuccess(task));
      })
      .catch((error) => {
        dispatch(updateTaskFailure(error.message));
      });
  };
};

export const updateTaskRequest = (task) => {
  return {
    type: actionTypes.UPDATE_TASK_REQUEST,
    payload: task,
  };
};

export const updateTaskSuccess = (task) => {
  return {
    type: actionTypes.UPDATE_TASK_SUCCESS,
    payload: task,
  };
};

export const updateTaskFailure = (error) => {
  return {
    type: actionTypes.UPDATE_TASK_FAILURE,
    payload: error,
  };
};

//#endregion

//#region ADD

export const addTask = (task, user) => {
  return (dispatch) => {
    dispatch(addTaskRequest(task));

    createItem(task, user)
      .then((response) => {
        const _id = response.data.insertedId;
        dispatch(addTaskSuccess({ ...task, _id }));
      })
      .catch((error) => {
        dispatch(addTaskFailure(error.message));
      });
  };
};

export const addTaskRequest = (task) => {
  return {
    type: actionTypes.ADD_TASK_REQUEST,
    payload: task,
  };
};

export const addTaskSuccess = (task) => {
  return {
    type: actionTypes.ADD_TASK_SUCCESS,
    payload: task,
  };
};

export const addTaskFailure = (error) => {
  return {
    type: actionTypes.ADD_TASK_FAILURE,
    payload: error,
  };
};

//#endregion

//#region DELETE TASK

export const deleteTask = (_id, user) => {
  return (dispatch) => {
    dispatch(deleteTaskRequest(_id));

    deleteItem(_id, user)
      .then((response) => {
        dispatch(deleteTaskSuccess(_id));
      })
      .catch((error) => {
        dispatch(deleteTaskFailure(error.message));
      });
  };
};

export const deleteTaskRequest = (task) => {
  return {
    type: actionTypes.DELETE_TASK_REQUEST,
    payload: task,
  };
};

export const deleteTaskSuccess = (_id) => {
  return { type: actionTypes.DELETE_TASK_SUCCESS, payload: _id };
};

export const deleteTaskFailure = (error) => {
  return { type: actionTypes.DELETE_TASK_FAILURE, payload: error };
};

//#endregion

//#region TOGGLE

export const toggleStatus = (_id, completed, user) => {
  return (dispatch) => {
    dispatch(toggleStatusRequest(_id));

    updateItem(_id, { completed: !completed }, user)
      .then((response) => {
        dispatch(toggleStatusSuccess(_id));
      })
      .catch((error) => {
        dispatch(toggleStatusFailure(error.message));
      });
  };
};

export const toggleStatusRequest = (_id) => {
  return {
    type: actionTypes.TOGGLE_TASK_REQUEST,
    payload: _id,
  };
};

export const toggleStatusSuccess = (_id) => {
  return {
    type: actionTypes.TOGGLE_TASK_SUCCESS,
    payload: _id,
  };
};

export const toggleStatusFailure = (error) => {
  return {
    type: actionTypes.TOGGLE_TASK_FAILURE,
    payload: error,
  };
};

//#endregion
