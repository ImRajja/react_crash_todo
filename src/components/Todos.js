// import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchTasks } from "../redux";
import TodoItem from "./TodoItem";

export const Todos = (props) => {
  const dispatch = useDispatch();
  const user = { result: { email: "mail2rajja@gmail.com" } };
  useEffect(() => {
    console.log(`in todos`);
    dispatch(fetchTasks(user));
  }, []);

  console.log(`props==>`);
  console.log(props);

  return props.props.tasks.map((todo) => (
    <TodoItem
      key={todo._id}
      todo={todo}
      user={user}
      //   markComplete={this.props.markComplete}
      //   delTodo={this.props.delTodo}
    />
  ));
};

// Todos.propTypes = {
//   todos: PropTypes.third,
// };

const mapStateToProps = (state) => {
  return {
    props: state.task,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => dispatch(fetchTasks),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
