import React from 'react';
import './TodoApp.css';
var classNames = require('classnames');

const TODOS = [
    { priority: 1, completed: false, text: 'Buy socks' },
    { priority: 2, completed: false, text: 'Fix 1€ bug on flight-scrappper' },
    { priority: 1, completed: false, text: 'Buy socks' },
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
            <tr onClick={this.handleClick} className={todoClasses}><td className="todo-row">{this.state.text}</td></tr>);
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TODOS
        };
    }
    buildRows(todos) {
        let rows = [];
        let i = 0;
        for (let todo of todos) {
            rows.push(<Todo  key={i} todo={todo}/>);
            i++;
        }
        return rows;
    }
    render() {
        let rows = this.buildRows(this.state.TODOS);
        return (<table><tbody >{rows}</tbody></table>);
    }
}

const TodoApp = () => {
    return (
        <div className="TodoApp"><TodoList todos={ TODOS }/></div>
    );
};

export default TodoApp;
