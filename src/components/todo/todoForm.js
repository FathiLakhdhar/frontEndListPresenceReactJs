import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleAllTodo, archiveTodos } from '../../actions/todoAction';

class TodoForm extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
            todotxt: ''
        }
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
        this.props.dispatch(addTodo(newtodo));
        this.setState({ todotxt: '' });
    }
    HandleSelectAll() {
        let { checked } = this.state;
        checked = !checked;
        this.setState({ checked });
        this.props.dispatch(toggleAllTodo(checked));
    }

    HandleArchive(){
        let ids = this.props.todos.filter(todo=>todo.complited).map(todo=>todo.id);
        //console.log(ids);
        this.props.dispatch(archiveTodos(ids));
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.HandleSubmit.bind(this)}>
                <div className='form-group'>
                    <div className="input-group todo-input-group">
                        <div className="input-group-addon">
                            <input type='checkbox' checked={this.state.checked} onClick={this.HandleSelectAll.bind(this)} />
                        </div>
                        <input type="text" value={this.state.todotxt} className="form-control" placeholder="new todo" onChange={(e) => this.setState({ todotxt: e.target.value })} />
                        <div className="input-group-btn">
                            <input type='button' className="btn btn-danger"  onClick={this.HandleArchive.bind(this)} value="archive" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect()(TodoForm);