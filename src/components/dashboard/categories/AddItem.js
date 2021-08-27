import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createItem } from '../../../redux/items/items.actions';

const AddItem = ({ auth, createItem, categoryId, sub_category }) => {

    const [itemState, setItemState] = useState({
        name: '',
        description: '',
        brand: '',
        price: 0,
        pictures: [],
        contactNumber: ''
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

    const onPictureHandler = (e) => {

        const pictures = [...itemState.pictures]; // Spread syntax creates a shallow copy
        pictures.push(...e.target.files); // Spread again to push each selected file individually
        setItemState({ ...itemState, pictures });
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        const { name, description, brand, price, contactNumber, pictures } = itemState;

        // VALIDATE
        if (!name || !description || !brand || !price || !contactNumber) {
            setErrorsState(['Please fill all fields!']);
            return
        }
        if (!pictures) {
            setErrorsState(['Please choose images first!']);
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
            setErrorsState(['Price is!']);
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
        formData.append('title', name);
        formData.append('description', description);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('contactNumber', contactNumber);
        formData.append('date_created', Date.now);
        formData.append('category', categoryId);
        formData.append('sub_category', sub_category);
        formData.append('creator', auth.user ? auth.user._id : '60c5d2a3f7b3082d8c4dadd6');
        pictures.forEach((pic) => formData.append('pictures', pic));

        // Attempt to create
        createItem(formData);

        // Reset the form
        setItemState({
            name: '',
            description: '',
            brand: '',
            price: 0,
            pictures: [],
            contactNumber: ''
        })

        // close the modal
        toggle();
    }

    return (

        <div>
            <i className="feather icon-plus-circle text-c-green f-30 m-r-10" onClick={toggle}></i>

            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle} className="bg-dark text-white">
                    New Item
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

                            <Input type="text" name="name" id="name" placeholder="Item name ..." className="mb-2" onChange={onChangeHandler} />

                            <Label for="description">
                                <strong>Description</strong>
                            </Label>

                            <Input type="text" name="description" id="description" placeholder="Item description ..." className="mb-2" onChange={onChangeHandler} />

                            <Label for="brand">
                                <strong>Brand</strong>
                            </Label>

                            <Input type="text" name="brand" id="brand" placeholder="Item brand ..." className="mb-2" onChange={onChangeHandler} />

                            <Label for="price">
                                <strong>Price</strong>
                            </Label>

                            <Input type="text" name="price" id="price" placeholder="Item price ..." className="mb-2" onChange={onChangeHandler} />

                            <Label for="pictures">
                                <strong>Picture</strong>
                            </Label>

                            <Input type="file" accept=".png, .jpg, .jpeg" name="pictures" placeholder="Item pictures ..." onChange={onPictureHandler} multiple />

                            <Label for="contactNumber">
                                <strong>Phone</strong>
                            </Label>

                            <Input type="text" name="contactNumber" id="contactNumber" placeholder="Item contact number ..." className="mb-2" onChange={onChangeHandler} />

                            <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

AddItem.propTypes = {
    auth: PropTypes.object,
}

// Map  state props
const mapStateToProps = state => ({ auth: state.authReducer });

export default connect(mapStateToProps, { createItem })(AddItem);