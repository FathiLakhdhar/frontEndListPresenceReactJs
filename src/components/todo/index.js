import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import { connect } from 'react-redux';
import TodoForm from './todoForm';
import TodoItems from './todoItems';
class Todo extends Component {
    
    

    render() {
        let { todos } = this.props;
        return (
            <div>
                <LpTitle title='Todos' />
                <div>
                    <TodoForm todos={todos} />
                    <TodoItems todos={todos}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(Todo);