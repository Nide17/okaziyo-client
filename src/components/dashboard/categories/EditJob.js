import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { getJobs, updateJob } from '../../../redux/items/jobs/jobs.actions'
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import "../assets/fonts/fontawesome/css/fontawesome-all.min.css"
import "../assets/plugins/animation/css/animate.min.css"
import "../assets/css/dashboard.css"

import DHeader from '../DHeader'
import Navigation from '../Navigation'
import VisitorHomepage from '../homepage/VisitorHomepage'
import LoginModal from '../../auth/LoginModal'

const EditJob = ({ auth, jobs, categories, updateJob, getJobs }) => {

    // Access route parameters
    const { jobId } = useParams()

    const jobToEdit = jobs && jobs.allJobs.find(job => job._id === jobId)

    const [jobState, setJobState] = useState({
        idToUpdate: jobToEdit && jobToEdit._id,
        title: jobToEdit && jobToEdit.title,
        company: jobToEdit && jobToEdit.brand,
        deadline: jobToEdit && jobToEdit.deadline,
        markdown: jobToEdit && jobToEdit.markdown
    })

    // Lifecycle methods to load items
    useEffect(() => {
        getJobs();
    }, [getJobs]);

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    const [showMob, setShowMob] = useState(false)

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);
        // Add data
        setJobState({ ...jobState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { idToUpdate, title, company, deadline, markdown } = jobState;

        // VALIDATE
        if (!title || !company || !deadline || !markdown) {
            setErrorsState(['Please fill all fields!']);
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
        const updatedJob = {
            idToUpdate,
            title,
            brand: company,
            deadline,
            markdown
        }

        // Attempt to create
        updateJob(updatedJob);

        // Reset the form
        setJobState({
            title: '',
            brand: '',
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

                                            {!jobs.isLoading ?

                                                <div className="mx-1">

                                                    <Row className="mb-0 mx-0">
                                                        <Breadcrumb>
                                                            <BreadcrumbItem>
                                                                <Link to="/dashboard" className="text-primary">Back Home</Link>
                                                            </BreadcrumbItem>
                                                        </Breadcrumb>
                                                    </Row>

                                                    <small className="ml-2 mt-0 one-cat-desc">
                                                        <i className="text-success text-left">
                                                            "{jobToEdit.category.description}"
                                                        </i>
                                                    </small>

                                                    <Row className="mb-0 mt-lg-4 mx-0 card Monthly-sales d-flex flex-row">

                                                        {jobs.isLoading ?
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

                                                                        <Input type="text" name="title" id="title" placeholder="Job title ..." className="mb-2" onChange={onChangeHandler} value={jobState.title || ''} />

                                                                        <Label for="company">
                                                                            <strong>Company</strong>
                                                                        </Label>

                                                                        <Input type="text" name="company" id="company" placeholder="Company name ..." className="mb-2" onChange={onChangeHandler} value={jobState.company || ''} />

                                                                        <Label for="deadline">
                                                                            <strong>Deadline</strong>
                                                                        </Label>

                                                                        <Input type="date" name="deadline" id="deadline" placeholder="Job deadline ..." className="mb-2" onChange={onChangeHandler} value={jobState.deadline || ''} />

                                                                        <Label for="markdown">
                                                                            <strong>Markdown</strong>
                                                                        </Label>

                                                                        <Input type="textarea" name="markdown" id="markdown" placeholder="Job details ..." minLength="80" rows="30" className="mb-2" onChange={onChangeHandler} value={jobState.markdown || ''} />

                                                                        <Button color="success" style={{ marginTop: '2rem' }} block >Update</Button>

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
    auth: state.authReducer,
    jobs: state.jobsReducer
});

export default connect(mapStateToProps, { getJobs, updateJob })(EditJob);