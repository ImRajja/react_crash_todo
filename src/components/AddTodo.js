import React, { useState } from "react";
import { addTask } from "../redux";
import { useDispatch } from "react-redux";

export default function AddTodo({ user }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submitted now..`);
    // this.props.addTodo(this.state.title);
    // const newTodo = { title };
    dispatch(addTask({ title }, user));
    setTitle("");
  };

  const handleChange = (e) => setTitle(e.target.value);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      <input
        type="text"
        name="title"
        style={{ flex: "10", padding: "5px" }}
        placeholder="Add Todo ..."
        value={title}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: "1" }}
      />
    </form>
  );
}

// PropTypes
// AddTodo.propTypes = {
//   addTodo: PropTypes.func.isRequired
// }

// export default AddTodo;
