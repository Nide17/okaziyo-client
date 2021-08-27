import React, { useState, useEffect } from 'react'
import { Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { getArchivesJobs } from '../../redux/items/jobs/jobs.actions'
import ItemsPagination from '../items/ItemsPagination'

const JobsArchives = ({ categories, archivedJobs, getArchivesJobs }) => {

    // Access route parameters
    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    // Lifecycle methods
    useEffect(() => {
        getArchivesJobs(pageNo);
        setNumberOfPages(archivedJobs.totalArchivesPages);
    }, [getArchivesJobs, pageNo, archivedJobs.totalArchivesPages]);

    return (
        <section className="container things all">

            {archivedJobs.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type="bars" color="#33FFFC" style={{ width: "120px", height: "120px", fill: "#499167" }} />
                </div> :

                <div className="row contents mb-5">

                    {archivedJobs && archivedJobs.archivedJobs.length > 0 ?
                        <>
                            <h4 className="col-12 mb-4">Jobs that should interest you from this category</h4>

                            <div className="cards by-category">
                                {archivedJobs && archivedJobs.archivedJobs.map(job => {

                                    const categoryToUse = categories && categories.allCategories.find(category =>
                                        category.sub_category.find(subcat => subcat._id === job.sub_category))

                                    return (

                                        <div key={job._id} className="col-6 col-md-3">

                                            <Card>
                                                <div className="img-holder mx-auto">
                                                    <CardImg top src={job.brand_image} alt={job.brand} />
                                                </div>

                                                <CardBody>
                                                    <CardTitle tag="h6">{job.title}</CardTitle>
                                                    <CardSubtitle tag="p" className="mb-2 text-muted">{job.brand}</CardSubtitle>

                                                    <CardText className="card-body text-center py-0 px-lg-2 d-flex justify-content-between align-items-center">
                                                        <span className="card-link">
                                                            <small>
                                                                {categoryToUse && categoryToUse.sub_category.find(subcat => subcat._id === job.sub_category).name}
                                                            </small>
                                                        </span>

                                                        <span className="card-link deadline text-danger">

                                                            <small className={`text-${new Date(job.deadline) < yesterday ? 'danger' : 'primary'}`}>
                                                                Deadline:&nbsp;
                                                                {new Date(job.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' :
                                                                
                                                                        new Date(job.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                            </small>

                                                        </span>
                                                    </CardText>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <a href={`/slickJob/${job._id}`} className="slickItem-button card-link btn btn-success">View job</a>

                                                        <span href="/" className="card-link ml-lg-1">
                                                            Posted on {new Date(job.updatedAt).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                        </span>
                                                    </div>

                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </div>
                            <ItemsPagination pageNo={pageNo} setPageNo={setPageNo} numberOfPages={numberOfPages} />
                        </> :

                        <Alert color="danger" className="w-100">
                            No jobs available in this category
                        </Alert>}

                </div>}
        </section>
    )
}

// Map  state props
const mapStateToProps = state => ({
    archivedJobs: state.jobsReducer,
});

export default connect(mapStateToProps, { getArchivesJobs })(JobsArchives);