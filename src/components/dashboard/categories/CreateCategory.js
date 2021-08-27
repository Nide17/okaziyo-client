import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { createCategory } from '../../../redux/categories/categories.actions';

const CreateCategory = ({ auth, createCategory }) => {

    const [categoryState, setCategoryState] = useState({
        name: '',
        description: ''
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);
        // Add data
        setCategoryState({ ...categoryState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { name, description } = categoryState;

        // VALIDATE
        if (name.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 15) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 80) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Category object
        const newCategory = {
            title: name,
            description,
            date_created: Date.now,
            creator: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createCategory(newCategory);

        // Reset the form
        setCategoryState({
            name: '',
            description: ''
        })

        // close the modal
        toggle();
    }

    return (
        auth.isAuthenticated ?

            <div>
                <i className="feather icon-plus-circle text-c-green f-30 m-r-10" onClick={toggle}></i>

                <Modal isOpen={modal} toggle={toggle}>

                    <ModalHeader toggle={toggle} className="bg-dark text-white">
                        New Category
                    </ModalHeader>

                    <ModalBody>

                        {errorsState.length > 0 ?
                            errorsState.map(err =>
                                <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                    {err}
                                </Alert>) :
                            null
                        }

                        <Form onSubmit={onSubmitHandler}>

                            <FormGroup>

                                <Label for="name">
                                    <strong>Title</strong>
                                </Label>

                                <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={onChangeHandler} required />

                                <Label for="description">
                                    <strong>Description</strong>
                                </Label>

                                <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={onChangeHandler} required />

                                <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div> :

            // If not authenticated or loading
            <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <Redirect to="/login" />
                }
            </div>
    );
}

export default connect(null, { createCategory })(CreateCategory);