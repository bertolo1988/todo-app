import React from 'react';
import ReactDOM from 'react-dom';
import './TodoApp.css';
import classNames from 'classnames';

const TODOS = [
    { priority: 1, completed: false, text: 'Buy socks' },
    { priority: 2, completed: false, text: 'Fix 1€ bug on flight-scrappper' },
    { priority: 1, completed: false, text: 'Buy Jeans' },
    { priority: 2, completed: true, text: 'Wash meat' },
    { priority: 3, completed: false, text: 'Oi them' },
];

class Todo extends React.Component {
    render() {
        let todoText = this.props.todo.text;
        return (
            <tr className={this.props.todoClasses}>
            <td><button ref='deleteTodo' onClick={this.props.deleteTodo.bind(this,todoText)} className='close-button'>&times;</button></td>
            <td  onClick={this.props.completeTodo.bind(this,todoText)} className='todo-row'>{todoText}</td>
            </tr>);
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { priority: 1, completed: false, text: '' };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState({ priority: 1, completed: false, text: '' });
        ReactDOM.findDOMNode(this.refs.value).focus();
        this.refs.value.value = '';
        return;
    }
    handleChangePriority(event) {
        this.setState({ priority: parseInt(event.target.value, 4) });
    }

    handleChangeText(event) {
        this.setState({ text: event.target.value });
    }
    render() {
        return (<div className='todo-form'>
            <form onSubmit={this.handleSubmit}>
            <input type='number' placeholder='priority' ref='priority' value={this.state.priority} onChange={this.handleChangePriority} min='1' max='3'/>
            <input type='text' placeholder='text' ref='value' value={this.state.value} onChange={this.handleChangeText}/>
            <input type='submit' value='Add'/>
            </form>
            </div>);
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: props.todos
        };
        this.updateItems = this.updateItems.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
    }
    updateItems(newTodo) {
        let todos = this.state.todos.concat([newTodo]);
        this.setState({
            todos: todos
        });
    }
    deleteTodo(todoToRemove) {
        let newTodos = this.state.todos.filter((_todo) => {
            return _todo.text !== todoToRemove;
        });
        this.setState({
            todos: newTodos
        });
    }
    switchPriority(priority) {
        switch (priority) {
            case 1:
                return 'low-priority';
            case 2:
                return 'medium-priority';
            default:
                return 'max-priority';
        }
    }
    getTodoClasses(todo) {
        let priorityClass = this.switchPriority(todo.priority);
        let completedClass = todo.completed ? 'completed-todo' : '';
        return classNames(priorityClass, completedClass);
    }
    completeTodo(todoText) {
        let todos = [];
        for (let todo of this.state.todos) {
            if (todoText === todo.text) {
                todo.completed = !todo.completed;
            }
            todos.push(todo);
        }
        this.setState({
            todos: todos
        });
    }
    buildRows(todos) {
        let rows = [];
        let i = 0;
        for (let todo of todos) {
            let todoClasses = this.getTodoClasses(todo);
            rows.push(<Todo deleteTodo={this.deleteTodo} completeTodo={this.completeTodo} todoClasses={todoClasses} key={i} todo={todo}/>);
            i++;
        }
        return rows;
    }
    render() {
        let rows = this.buildRows(this.state.todos);
        return (<div className='todo-list'><table><tbody >{rows}</tbody></table><TodoForm onFormSubmit={this.updateItems}/></div>);
    }
}

const TodoApp = () => {
    return (
        <div className="TodoApp"><TodoList todos={TODOS}/></div>
    );
};

export default TodoApp;
