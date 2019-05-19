import React, { Component } from 'react';
import EditUpdateDeleteObject from './editUpdateDeleteObject.js';
import TodoList from './todoList.js';

const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;



class TodoLists extends React.Component {
    constructor(props) {
        super(props);

        this.handleListNameClick = this.handleListNameClick.bind(this);
        this.renderNameOrEditField = this.renderNameOrEditField.bind(this);
        this.toggleEditingOff = this.toggleEditingOff.bind(this);

        this.state = {editing: ''};
    }

    toggleEditingOff() {
        this.setState({editing: ''});
    }

    handleListNameClick(listId, listName) {
        this.props.onListNameChange(listName);
        this.setState({editing: listId});
    }

    renderNameOrEditField(list) {
        if (this.state.editing === list.id) {
            return (
                <EditUpdateDeleteObject object={list}
                                        updatedName={this.props.updatedListName}
                                        onDeleteObject={this.props.onDeleteList}
                                        onUpdateObject={this.props.onUpdateList}
                                        onNameChange={this.props.onListNameChange}
                                        toggleOff={this.toggleEditingOff}
                />
            );
        } else {
            return (
                <h3 onClick={() => this.handleListNameClick(list.id, list.name)}>{list.name} <Button bsStyle="danger"
                                                                                                     onClick={() => this.props.onDeleteList(list.id)}>Delete</Button>
                </h3>
            )
        }
    }

    render() {
        var todoLists = this.props.lists.map((list, index) =>
            <div key={list.id}>
                {this.renderNameOrEditField(list)}
                <TodoList index={index}
                          listId={list.id}
                          items={list.items}
                          onItemAdderNameChange={this.props.onItemAdderNameChange}
                          onAddItem={this.props.onAddItem}
                          itemAdderName={this.props.itemAdders[index]}/>
            </div>
        );
        return (
            <div>
                {todoLists}
            </div>
        );
    }
}


export default TodoLists;
