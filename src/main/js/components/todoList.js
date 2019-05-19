import React, { Component } from 'react';

const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;

import EditUpdateDeleteObject from './editUpdateDeleteObject.js';


class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemNameClick = this.handleItemNameClick.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.toggleEditingOff = this.toggleEditingOff.bind(this);
        this.handleItemCheckboxChange = this.handleItemCheckboxChange.bind(this);

        this.state = {editing: '', updatedItemName: '', items: []};
    }

    componentDidMount() {
        this.setState({items: this.props.items});
    }

    toggleEditingOff() {
        this.setState({editing: ''});
    }

    handleItemNameClick(itemId, itemName) {
        this.handleItemNameChange(itemName);
        this.setState({editing: itemId});
    }

    handleItemNameChange(itemName) {
        this.setState({updatedItemName: itemName});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddItem(this.props.index, this.props.listId);
    }

    handleDeleteItem(listId, itemId) {
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items.filter(item => item.id !== itemId);
                return {
                    items: myItems
                };
            });
        })
    }

    handleUpdateItem(listId, itemId) {
        let updatedItem = {
            name: this.state.updatedItemName
        }
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(updatedItem),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items;
                myItems.forEach(function (item) {
                    if (item.id === itemId) {
                        item.name = prevState.updatedItemName;
                    }
                });
                return {
                    items: myItems,
                    updatedItemName: ''
                }
            });
        });
    }

    handleItemCheckboxChange(listId, itemId) {
        let itemToToggle = this.state.items.filter( item => item.id === itemId)[0];
        itemToToggle.completed = !itemToToggle.completed;
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(itemToToggle),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            this.setState(function (prevState, props) {
                let myItems = prevState.items;
                myItems.forEach(function (item) {
                    if (item.id === itemId) {
                        item.completed = itemToToggle.completed;
                    }
                });
                return {
                    items: myItems,
                    updatedItemName: ''
                }
            });
        })
    }

    render() {
        let editing = this.state.editing;
        let updatedItemName = this.state.updatedItemName;
        let handleItemNameClick = this.handleItemNameClick;
        let handleItemNameChange = this.handleItemNameChange;
        let handleDeleteItem = this.handleDeleteItem;
        let handleUpdateItem = this.handleUpdateItem;
        let toggleEditingOff = this.toggleEditingOff;
        let handleItemCheckboxChange = this.handleItemCheckboxChange;
        let listId = this.props.listId;
        let items = this.state.items.map(function (item) {
            if (editing === item.id) {
                return (
                    <ListGroupItem key={item.id}>
                        <EditUpdateDeleteObject object={item}
                                                updatedName={updatedItemName}
                                                onDeleteObject={(itemId) => handleDeleteItem(listId, itemId)}
                                                onUpdateObject={(itemId) => handleUpdateItem(listId, itemId)}
                                                onNameChange={handleItemNameChange}
                                                toggleOff={toggleEditingOff}/>
                    </ListGroupItem>
                );
            } else {
                return (
                    <ListGroupItem key={item.id}>
                        <Checkbox checked={item.completed}
                            onChange={() => handleItemCheckboxChange(listId, item.id)}>
                            <div onClick={() => handleItemNameClick(item.id, item.name)}>
                                {item.name}
                            </div>
                        </Checkbox>
                    </ListGroupItem>
                );
            }
        });
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text"
                                placeholder="Enter text1"
                                value={this.props.itemAdderName}
                                onChange={(e) => this.props.onItemAdderNameChange(this.props.index, e.target.value)}
                            />
                            <InputGroup.Button>
                                <Button
                                    onClick={(e) => this.props.onAddItem(this.props.index, this.props.listId)}>Add</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
                <ListGroup>
                    {items}
                </ListGroup>
            </div>
        );
    }
}

export default TodoList;
