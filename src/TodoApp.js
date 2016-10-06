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
    constructor(props) {
        super(props);
        this.state = {
            priority: this.props.todo.priority,
            completed: this.props.todo.completed,
            text: this.props.todo.text
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            completed: !this.state.completed
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
    getCompletedClass(completed) {
        return completed ? 'completed-todo' : '';
    }
    render() {
        let priorityClass = this.switchPriority(this.state.priority);
        let completedClass = this.getCompletedClass(this.state.completed);
        let todoClasses = classNames(priorityClass, completedClass);
        return (
            <tr className={todoClasses}>
            <td><button ref='deleteTodo' onClick={this.props.deleteTodo.bind(this,this.state)} className='close-button'>&times;</button></td>
            <td  onClick={this.handleClick} className='todo-row'>{this.state.text}</td>
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
    }
    updateItems(newTodo) {
        let todos = this.state.todos.concat([newTodo]);
        this.setState({
            todos: todos
        });
    }
    deleteTodo(todoToRemove) {
        let newTodos = this.state.todos.filter((_todo) => {
            return _todo.text !== todoToRemove.text;
        });
        this.setState({
            todos: newTodos
        });
    }
    buildRows(todos) {
        let rows = [];
        let i = 0;
        for (let todo of todos) {
            rows.push(<Todo deleteTodo={this.deleteTodo} key={i} todo={todo}/>);
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
