import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem } from '../../../redux/items/items.actions';
import EditIcon from '../../../images/edit.svg';

const EditItem = ({ updateItem, itemToEdit }) => {

    const [itemState, setItemState] = useState({
        idToUpdate: itemToEdit && itemToEdit._id,
        name: itemToEdit && itemToEdit.title,
        description: itemToEdit && itemToEdit.description,
        brand: itemToEdit && itemToEdit.brand,
        price: itemToEdit && itemToEdit.price,
        contactNumber: itemToEdit && itemToEdit.contactNumber
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
        setItemState({ ...itemState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { idToUpdate, name, description, brand, price, contactNumber } = itemState;

        // VALIDATE
        if (!name || !description || !brand || !price || !contactNumber) {
            setErrorsState(['Please fill all fields!']);
            return
        }
        if (name.length < 4 || description.length < 4 || brand.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 15) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (brand.length > 15) {
            setErrorsState(['Brand is too long!']);
            return
        }
        else if (price < 0) {
            setErrorsState(['Price is required!']);
            return
        }
        else if (contactNumber.length !== 10) {
            setErrorsState(['Invalid number!']);
            return
        }
        else if (description.length > 80) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new item object
        const updatedItem = {
            idToUpdate,
            title: name,
            description,
            brand,
            price,
            contactNumber
        }

        // Attempt to create
        updateItem(updatedItem);

        // close the modal
        toggle();
    }

    return (

        <>
            <img src={EditIcon} alt="" width="16" height="16" onClick={toggle} />

            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle} className="bg-dark text-white">
                    Update Item
                </ModalHeader>

                <ModalBody>

                    {errorsState.length > 0 ?
                        errorsState.map(err =>
                            <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                {err}
                            </Alert>) :
                        null
                    }

                    <Form onSubmit={onSubmitHandler} encType='multipart/form-data'>

                        <FormGroup>

                            <Label for="name">
                                <strong>Name</strong>
                            </Label>

                            <Input type="text" name="name" id="name" placeholder="Item name ..." className="mb-2" onChange={onChangeHandler} value={(itemState.name) || ''} required />

                            <Label for="description">
                                <strong>Description</strong>
                            </Label>

                            <Input type="text" name="description" id="description" placeholder="Item description ..." className="mb-2" onChange={onChangeHandler} value={(itemState.description) || ''} required />

                            <Label for="brand">
                                <strong>Brand</strong>
                            </Label>

                            <Input type="text" name="brand" id="brand" placeholder="Item brand ..." className="mb-2" onChange={onChangeHandler} value={(itemState.brand) || ''} required />

                            <Label for="price">
                                <strong>Price</strong>
                            </Label>

                            <Input type="text" name="price" id="price" placeholder="Item price ..." className="mb-2" onChange={onChangeHandler} value={(itemState.price) || ''} required />

                            <Label for="contactNumber">
                                <strong>Phone</strong>
                            </Label>

                            <Input type="text" name="contactNumber" id="contactNumber" placeholder="Item contact number ..." className="mb-2" onChange={onChangeHandler} value={(itemState.contactNumber) || ''} required />

                            <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

EditItem.propTypes = {
    auth: PropTypes.object,
}

// Map  state props
const mapStateToProps = state => ({ auth: state.authReducer });

export default connect(mapStateToProps, { updateItem })(EditItem);