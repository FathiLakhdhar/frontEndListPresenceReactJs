import React, { Component } from 'react';
import { toggleTodo } from '../../actions/todoAction';
import { connect } from 'react-redux';

class TodoItems extends Component {

    HandleTodoSelect(id) {
        this.props.dispatch(toggleTodo(id));
    }

    render() {
        let { todos } = this.props;
        return (
            <ul className="list-group">
                {todos.map((todo, i) => <li onClick={this.HandleTodoSelect.bind(this, todo.id)} style={todo.complited ? { textDecoration: 'line-through' } : {}} className="list-group-item" key={i}><input type='checkbox' checked={todo.complited} /> {todo.text}</li>)}
            </ul>
        );
    }
}


export default connect()(TodoItems);