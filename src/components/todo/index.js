import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, toggleAllTodo } from '../../actions/todoAction';
import { bindActionCreators } from 'redux';
class Todo extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            todotxt: ''
        }
    }

    HandleSelectAll() {
        let { checked } = this.state;
        checked = !checked;
        this.setState({ checked });
        this.props.toggleAllTodo(checked);
    }

    HandleTodoSelect(id) {
        this.props.toggleTodo(id);
    }


    HandleSubmit(e) {
        e.preventDefault();
        let id = this.props.todos.length;
        id++;
        let newtodo = {
            id,
            complited: false,
            text: this.state.todotxt
        };
        this.props.addTodo(newtodo);
        this.setState({todotxt:''});
    }

    render() {
        let { todos } = this.props;
        let todosItems = (
            <ul className="list-group">
                {todos.map((todo, i) => <li style={todo.complited ? { textDecoration: 'line-through' } : {}} className="list-group-item" key={i}><input type='checkbox' checked={todo.complited} onClick={this.HandleTodoSelect.bind(this, todo.id)} /> {todo.text}</li>)}
            </ul>
        );
        return (
            <div>
                <LpTitle title='Todos' />
                <div>
                    <form className="form-inline" onSubmit={this.HandleSubmit.bind(this)}>
                        <div className='form-group'>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <input type='checkbox'  checked={this.state.checked} onClick={this.HandleSelectAll.bind(this)} />
                                </div>
                                <input type="text" value={this.state.todotxt} className="form-control" placeholder="new todo" onChange={(e) => this.setState({ todotxt: e.target.value })} />
                            </div>
                        </div>
                    </form>
                    {todosItems}

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
function mapDispatchToProps(dispatch) {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
        toggleTodo: bindActionCreators(toggleTodo, dispatch),
        toggleAllTodo: bindActionCreators(toggleAllTodo, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);