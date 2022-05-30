import * as actionTypes from "./taskTypes";

const initialState = {
  tasks: [],
  activeTask: {},
  loading: false,
  error: "",
  formVisibility: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FORM_VISIBILITY:
      let activeTask = state.activeTask;

      if (state.formVisibility) {
        activeTask = {};
      }
      return {
        ...state,
        formVisibility: !state.formVisibility,
        activeTask: activeTask,
      };

    case actionTypes.EDIT_ACTIVE_TASK:
      return { ...state, activeTask: action.payload };

    //#region FETCH
    case actionTypes.FETCH_TASKS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_TASKS_SUCCESS:
      return { loading: false, tasks: action.payload, error: "" };
    case actionTypes.FETCH_TASKS_FAILURE:
      return { loading: false, tasks: [], error: action.payload };
    //#endregion
    //#region UPDATE
    case actionTypes.UPDATE_TASK_REQUEST: {
      return { ...state, loading: true };
    }
    case actionTypes.UPDATE_TASK_SUCCESS: {
      const filteredTasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );

      return {
        ...state,
        loading: false,
        tasks: [...filteredTasks, action.payload],
        error: "",
        activeTask: {},
        formVisibility: false,
      };
    }
    case actionTypes.UPDATE_TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    //#endregion
    //#region ADD
    case actionTypes.ADD_TASK_REQUEST: {
      const task = action.payload;
      return { ...state, loading: true, activeTask: task };
    }
    case actionTypes.ADD_TASK_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, task],
        error: "",
        activeTask: {},
        formVisibility: false,
      };
    }
    case actionTypes.ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        activeTask: {},
      };
    //#endregion

    //#region DELETE
    case actionTypes.DELETE_TASK_REQUEST: {
      return { ...state, loading: true, activeTask: {} };
    }
    case actionTypes.DELETE_TASK_SUCCESS: {
      const filteredTasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );

      return {
        ...state,
        loading: false,
        tasks: [...filteredTasks],
        error: "",
        activeTask: {},
        formVisibility: false,
      };
    }
    case actionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        activeTask: {},
      };
    //#endregion

    //#region TOGGLE
    case actionTypes.TOGGLE_TASK_REQUEST: {
      return { ...state, loading: true };
    }
    case actionTypes.TOGGLE_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: [
          ...state.tasks.map((task) => {
            return task._id !== action.payload
              ? task
              : { ...task, completed: !task.completed };
          }),
        ],
        error: "",
        activeTask: {},
      };
    }
    case actionTypes.TOGGLE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        activeTask: {},
      };
    //#endregion

    default:
      return state;
  }
};

export default reducer;
