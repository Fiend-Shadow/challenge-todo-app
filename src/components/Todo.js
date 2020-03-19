import React, { Component } from 'react';
import axios from "axios";

 class Todo extends Component {
     
    deletOneTodo = (event)=>{
        event.preventDefault();
        window.location.reload();
        axios.delete(`http://localhost:5000/api/v1/todos/${this.props.data._id}`)
        .then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        });
        
    }
    render() {
        const {title , body} = this.props.data;
        return (
            <div id="oneTodo">
                <h2>{title}</h2>
                <p>{body}</p>
                <form onSubmit={this.deletOneTodo}>
                    <button type="submit">delete</button>
                </form>
            </div>
        )
    }
}


export default Todo;