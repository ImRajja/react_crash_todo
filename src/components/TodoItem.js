import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleStatus } from "../redux";

export default function TodoItem(props) {
  const dispatch = useDispatch();
  const getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: props.todo.completed ? "line-through" : "none",
    };
  };

  const { _id, title, completed } = props.todo;
  return (
    <div style={getStyle()}>
      <p>
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => dispatch(toggleStatus(_id, completed, props.user))}
        />{" "}
        {title}
        <button
          onClick={() => dispatch(deleteTask(_id, props.user))}
          style={btnStyle}
        >
          x
        </button>
      </p>
    </div>
  );
}

// PropTypes
// TodoItem.propTypes = {
//   todo: PropTypes.object.isRequired,
//   markComplete: PropTypes.func.isRequired,
//   delTodo: PropTypes.func.isRequired,
// };

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

// export default TodoItem;
