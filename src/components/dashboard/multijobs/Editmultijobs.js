import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { updateMultijobs, getMultijobs } from '../../../redux/multijobs/multijobs.actions'
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"

import DHeader from '../DHeader'
import Navigation from '../Navigation'
import VisitorHomepage from '../homepage/VisitorHomepage'
import LoginModal from '../../auth/LoginModal'

const Editmultijobs = ({ auth, categories, multijobs, updateMultijobs, getMultijobs }) => {

    // Access route parameters
    const { multijobsId } = useParams()

    const multiJobsToEdit = multijobs && multijobs.allMultijobs.find(multijob => multijob._id === multijobsId)

    const [multijobsState, setMultiJobsState] = useState({
        idToUpdate: multiJobsToEdit && multiJobsToEdit._id,
        title: multiJobsToEdit && multiJobsToEdit.title,
        markdown: multiJobsToEdit && multiJobsToEdit.markdown
    })

    // Lifecycle methods to load multijobs
    useEffect(() => {
        getMultijobs(multijobsId);
    }, [getMultijobs, multijobsId]);
    
    console.log(multiJobsToEdit)
    // Errors state on form
    const [errorsState, setErrorsState] = useState([])
    const [showMob, setShowMob] = useState(false)

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);
        // Add data
        setMultiJobsState({ ...multijobsState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { idToUpdate, title, markdown } = multijobsState;

        // VALIDATE
        if (title.length < 4 || markdown.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (title.length > 80) {
            setErrorsState(['Multi-Jobs title is too long!']);
            return
        }
        else if (markdown.length < 80) {
            setErrorsState(['Multi-Jobs details are insufficient!']);
            return
        }

        // Create new multi-jobs object
        const multiJobs = {
            idToUpdate,
            title,
            markdown,
            creator: auth.user ? auth.user._id : null
        }

        // Attempt to create
        updateMultijobs(multiJobs);

        // Reset the form
        setMultiJobsState({
            title: '',
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

                                            <div className="mx-1">

                                                <Row className="mb-0 mx-0">
                                                    <Breadcrumb>
                                                        <BreadcrumbItem>
                                                            <Link to="/dashboard/multi-jobs">Multi-Jobs</Link>
                                                        </BreadcrumbItem>
                                                        <BreadcrumbItem active>
                                                            Create New
                                                        </BreadcrumbItem>
                                                    </Breadcrumb>
                                                </Row>

                                                <Row className="mb-0 mt-lg-4 mx-0 card Monthly-sales d-flex flex-row">

                                                    <Col>
                                                        {errorsState.length > 0 ?
                                                            errorsState.map(err =>
                                                                <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                                                    {err}
                                                                </Alert>) :
                                                            null
                                                        }

                                                        <Form onSubmit={onSubmitHandler}>

                                                            <FormGroup>

                                                                <Label for="title">
                                                                    <strong>Title</strong>
                                                                </Label>

                                                                <Input type="text" name="title" id="title" placeholder="Multi-Jobs title ..." className="mb-2" onChange={onChangeHandler} value={multijobsState.title || ''} />

                                                                <Label for="markdown">
                                                                    <strong>Markdown</strong>
                                                                </Label>

                                                                <Input type="textarea" name="markdown" id="markdown" placeholder="Job details ..." minLength="80" rows="30" className="mb-2" onChange={onChangeHandler} value={multijobsState.markdown || ''} />

                                                                <Button color="success" style={{ marginTop: '2rem' }} block >Update</Button>

                                                            </FormGroup>

                                                        </Form>
                                                    </Col>

                                                </Row>
                                            </div>
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
    auth: state.authReducer,
    multijobs: state.multijobsReducer
});

export default connect(mapStateToProps, { updateMultijobs, getMultijobs })(Editmultijobs);