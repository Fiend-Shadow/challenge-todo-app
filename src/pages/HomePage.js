import React, { Component } from "react";
import Todo from "./../components/Todo";
import axios from "axios";

export default class HomePage extends Component {
  state = {
    todoList: [],
    showForm: false,
    title: "",
    body:""
  };

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    axios
      .get("http://localhost:5000/api/v1/todos")
      .then(response => {
        console.log(response.data);
        this.setState({ todoList: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  toggleForm = event => {
    event.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  };

  addTodo = event => {
    event.preventDefault();
    const {title,body}=this.state
    axios
      .post("http://localhost:5000/api/v1/todos",{title,body})
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
      window.location.reload();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.toggleForm} id="toggle">
          <button type="submit">Add Todo</button>
        </form>
        {this.state.showForm ? (
          <>
            <form onSubmit={this.addTodo} id="addForm">
            <div>
              <label>title</label>
              <input name="title" onChange={this.handleChange}></input>
            </div>
              <div>
              <label>body</label>
              <input name="body" onChange={this.handleChange}></input>
              </div>
              <div>
              <button>add</button>
              </div>
            </form>
          </>
        ) : (
          <div id="todoList">
            {this.state.todoList.map(oneTodo => {
              return <Todo data={oneTodo} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
