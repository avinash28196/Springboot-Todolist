'use strict';


const React = require('react');
const ReactDOM = require('react-dom');

const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;

import AddTodoList from './components/addTodoList.js';
import EditUpdateDeleteObject from './components/editUpdateDeleteObject.js';
import TodoLists from './components/todoLists.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoLists: [], newListName: '', updatedListName: '', todoItemAdders: []};
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
        this.handleUpdatedListNameChange = this.handleUpdatedListNameChange.bind(this);
        this.handleItemAdderNameChange = this.handleItemAdderNameChange.bind(this);
        this.handleNewList = this.handleNewList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleUpdateList = this.handleUpdateList.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    componentDidMount() {
        fetch('/lists', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();

        }).then(json => {
            this.setState({todoLists: json, todoItemAdders: new Array(json.length).fill('')});
        });
    }

    handleItemAdderNameChange(index, name) {
        this.setState(function (prevState, props) {
            let myTodoItemAdders = prevState.todoItemAdders;
            myTodoItemAdders[index] = name;
            return {
                todoItemAdders: myTodoItemAdders
            };
        });
    }

    handleNewListNameChange(listName) {
        this.setState({newListName: listName});
    }

    handleUpdatedListNameChange(listName) {
        this.setState({updatedListName: listName});
    }

    handleNewList() {
        let newList = {
            name: this.state.newListName
        };
        fetch('/lists', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newList),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.push(json);
                return {
                    todoLists: myTodoLists,
                    newListName: ''
                };
            });
        });
    }

    handleNewItem(index, listId) {
        let newItem = {
            name: this.state.todoItemAdders[index]
        }
        fetch('/lists/' + listId + '/items', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newItem),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.forEach(function (todoList) {
                    if (todoList.id == listId) {
                        todoList.items.push(json);
                    }
                });
                let myTodoItemAdders = prevState.todoItemAdders;
                myTodoItemAdders[index] = '';
                return {
                    todoLists: myTodoLists,
                    todoItemAdders: myTodoItemAdders
                };
            });
        });
    }

    handleUpdateList(listId) {
        let updatedList = {
            name: this.state.updatedListName
        };
        fetch('/lists/' + listId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(updatedList),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.forEach(function (todoList) {
                    if (todoList.id === listId) {
                        todoList.name = prevState.updatedListName;
                    }
                });
                return {
                    todoLists: myTodoLists,
                    updatedListName: ''
                };
            });
        });
    }

    handleDeleteList(listId) {
        fetch('/lists/' + listId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState, props) {
                let myTodoLists = prevState.todoLists.filter((todoList =>
                    todoList.id !== listId
                ));
                return {
                    todoLists: myTodoLists
                };
            });
        });
    }

    render() {
        const newListName = this.state.newListName;
        return (
            <div>
                <TodoLists lists={this.state.todoLists}
                           itemAdders={this.state.todoItemAdders}
                           updatedListName={this.state.updatedListName}
                           onDeleteList={this.handleDeleteList}
                           onUpdateList={this.handleUpdateList}
                           onListNameChange={this.handleUpdatedListNameChange}
                           onItemAdderNameChange={this.handleItemAdderNameChange}
                           onAddItem={this.handleNewItem}
                />
                <AddTodoList listName={newListName}
                             onAddList={this.handleNewList}
                             onListNameChange={this.handleNewListNameChange}/>
            </div>
        );
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
