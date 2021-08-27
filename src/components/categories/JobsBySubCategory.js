import React, { useState, useEffect } from 'react'
import { Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { getSubCategoryJobs } from '../../redux/items/jobs/jobs.actions'
import ItemsPagination from '../items/ItemsPagination'

const JobsBySubCategory = ({ categories, jobs, getSubCategoryJobs }) => {

    // Access route parameters
    const { subCategoryId } = useParams()
    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    // Lifecycle methods
    useEffect(() => {
        getSubCategoryJobs(subCategoryId, pageNo);
        setNumberOfPages(jobs.totalPages);
    }, [getSubCategoryJobs, pageNo, jobs.totalPages, subCategoryId]);

    return (
        <section className="container things all">

            {jobs.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type="bars" color="#33FFFC" style={{ width: "120px", height: "120px", fill: "#499167" }} />
                </div> :

                <div className="row contents mb-5">

                    {jobs && jobs.subCatJobs.length > 0 ?
                        <>
                            <h4 className="col-12 mb-4">Jobs that should interest you from this sub-category</h4>

                            <div className="cards by-category">
                                {jobs && jobs.subCatJobs.map(job => {

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

                                                                    (new Date(job.deadline) < yesterday) ? 'Closed' :

                                                                        new Date(job.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}

                                                            </small>
                                                        </span>
                                                        
                                                    </CardText>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <a href={`/slickJob/${job.slug}`} className="slickItem-button card-link btn btn-success">View job</a>

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
                            No jobs available in this sub-category
                        </Alert>}

                </div>}
        </section>
    )
}

// Map  state props
const mapStateToProps = state => ({
    jobs: state.jobsReducer,
});

export default connect(mapStateToProps, { getSubCategoryJobs })(JobsBySubCategory);