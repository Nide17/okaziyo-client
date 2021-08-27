import React, { useState } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { createJob } from '../../../redux/items/jobs/jobs.actions'
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"

import DHeader from '../DHeader'
import Navigation from '../Navigation'
import VisitorHomepage from '../homepage/VisitorHomepage'
import LoginModal from '../../auth/LoginModal'

const CreateJob = ({ auth, categories, createJob }) => {

    const [itemState, setItemState] = useState({
        title: '',
        company: '',
        brand_image: null,
        deadline: '2025-01-01',
        markdown: ''
    })

    // Access route parameters
    const { subCategoryId } = useParams()

    const categoryToUse = categories && categories.allCategories.find(category =>
        category.sub_category.find(subcat => subcat._id === subCategoryId))

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    const [showMob, setShowMob] = useState(false)

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);
        // Add data
        setItemState({ ...itemState, [e.target.name]: e.target.value });
    };

    const onPictureHandler = (e) => {
        setItemState({ ...itemState, brand_image: e.target.files[0] });
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        const { title, company, deadline, markdown, brand_image } = itemState;

        // VALIDATE
        if (!title || !company || !deadline || !markdown) {
            setErrorsState(['Please fill all fields!']);
            return
        }
        if (!brand_image) {
            setErrorsState(['Please choose an image first!']);
            return
        }
        if (title.length < 4 || company.length < 4 || deadline.length < 4 || markdown.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (title.length > 80) {
            setErrorsState(['Job title is too long!']);
            return
        }
        else if (company.length > 50) {
            setErrorsState(['company name is too long!']);
            return
        }
        else if (markdown.length < 80) {
            setErrorsState(['job details are insufficient!']);
            return
        }

        // Create new item object
        formData.append('title', title);
        formData.append('brand', company);
        formData.append('brand_image', brand_image)
        formData.append('deadline', deadline);
        formData.append('markdown', markdown);
        formData.append('category', categoryToUse._id);
        formData.append('sub_category', subCategoryId);
        formData.append('creator', auth.user ? auth.user._id : null);

        // Attempt to create
        createJob(formData);

        // Reset the form
        setItemState({
            title: '',
            company: '',
            deadline: '',
            markdown: ''
        })
    }

    return (

        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div className="dashboard">

                    <div className="loader-bg">
                        <div className="loader-track">
                            <div className="loader-fill"></div>
                        </div>
                    </div>

                    <Navigation showMob={showMob} setShowMob={setShowMob} categories={categories} />
                    <DHeader showMob={showMob} setShowMob={setShowMob} />

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">

                                    <div className="main-body">
                                        <div className="page-wrapper">

                                            {!categories.isLoading ?

                                                <div className="mx-1">

                                                    <Row className="mb-0 mx-0">
                                                        <Breadcrumb>
                                                            <BreadcrumbItem>
                                                                <Link to="/dashboard">{categoryToUse.title}</Link>
                                                            </BreadcrumbItem>
                                                            <BreadcrumbItem active>
                                                                {categoryToUse.sub_category.find(subcat => subcat._id === subCategoryId).name}
                                                            </BreadcrumbItem>
                                                        </Breadcrumb>
                                                    </Row>

                                                    <small className="ml-2 mt-0 one-cat-desc">
                                                        <i className="text-success text-left">
                                                            "{categoryToUse.sub_category.find(subcat => subcat._id === subCategoryId).description}"
                                                        </i>
                                                    </small>

                                                    <Row className="mb-0 mt-lg-4 mx-0 card Monthly-sales d-flex flex-row">

                                                        {categories.isLoading ?
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <ReactLoading type="bars" color="#33FFFC" />
                                                            </div> :

                                                            <Col>
                                                                {errorsState.length > 0 ?
                                                                    errorsState.map(err =>
                                                                        <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                                                            {err}
                                                                        </Alert>) :
                                                                    null
                                                                }

                                                                <Form onSubmit={onSubmitHandler} encType='multipart/form-data'>

                                                                    <FormGroup>

                                                                        <Label for="title">
                                                                            <strong>Job Title</strong>
                                                                        </Label>

                                                                        <Input type="text" name="title" id="title" placeholder="Job title ..." className="mb-2" onChange={onChangeHandler} value={itemState.title || ''} />

                                                                        <Label for="company">
                                                                            <strong>Company</strong>
                                                                        </Label>

                                                                        <Input type="text" name="company" id="company" placeholder="Company name ..." className="mb-2" onChange={onChangeHandler} value={itemState.company || ''} />

                                                                        <Label for="brand_image">
                                                                            <strong>Company Logo</strong>
                                                                        </Label>

                                                                        <Input type="file" accept=".png, .jpg, .jpeg" name="brand_image" placeholder="Company logo ..." onChange={onPictureHandler} onClick={e => (e.target.value = null)} />

                                                                        <Label for="deadline">
                                                                            <strong>Deadline</strong>
                                                                        </Label>

                                                                        <Input type="date" name="deadline" id="deadline" placeholder="Job deadline ..." className="mb-2" onChange={onChangeHandler} value={itemState.deadline || ''} />

                                                                        <Label for="markdown">
                                                                            <strong>Markdown</strong>
                                                                        </Label>

                                                                        <Input type="textarea" name="markdown" id="markdown" placeholder="Job details ..." minLength="80" rows="30" className="mb-2" onChange={onChangeHandler} value={itemState.markdown || ''} />

                                                                        <Button color="success" style={{ marginTop: '2rem' }} block >Create</Button>

                                                                    </FormGroup>

                                                                </Form>
                                                            </Col>}

                                                    </Row>
                                                </div> :
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <ReactLoading type="bars" color="#33FFFC" />
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="assets/js/vendor-all.min.js"></script>
                    <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
                    <script src="assets/js/pcoded.min.js"></script>
                </div> :
                <VisitorHomepage userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { createJob })(CreateJob);