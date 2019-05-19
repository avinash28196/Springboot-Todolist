import React, { Component } from 'react';



const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;


class AddTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.onListNameChange(e.target.value);
    }

    handleClick() {
        this.props.onAddList();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

    render() {
        const listName = this.props.listName;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Enter a name for your new list:</ControlLabel>
                    <FormControl
                        type="text"
                        value={listName}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Add List</Button>
                </FormGroup>
            </form>
        );
    }
}

export default AddTodoList;
