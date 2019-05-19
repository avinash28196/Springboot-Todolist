import React, { Component } from 'react';


const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const FormControl = require('react-bootstrap').FormControl;
const FormGroup = require('react-bootstrap').FormGroup;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Button = require('react-bootstrap').Button;
const InputGroup = require('react-bootstrap').InputGroup;
const Checkbox = require('react-bootstrap').Checkbox;

class EditUpdateDeleteObject extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleSubmit(e, objId) {
        e.preventDefault();
        this.handleUpdateButtonClick(objId);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleUpdateButtonClick(objId) {
        this.props.onUpdateObject(objId);
        this.props.toggleOff();
    }

    handleDeleteButtonClick(objId) {
        this.props.onDeleteObject(objId);
    }

    render() {
        let obj = this.props.object;
        return (
            <form onSubmit={(e) => this.handleSubmit(e, obj.id)}>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Enter text"
                            value={this.props.updatedName}
                            onChange={this.handleNameChange}
                        />
                        <InputGroup.Button>
                            <Button onClick={() => this.handleUpdateButtonClick(obj.id)}>Update</Button>
                        </InputGroup.Button>
                        <InputGroup.Button>
                            <Button bsStyle="danger"
                                    onClick={() => this.handleDeleteButtonClick(obj.id)}>Delete</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }

}

export default EditUpdateDeleteObject;
