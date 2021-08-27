import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { connect } from 'react-redux'
import { getActiveScholarships } from '../../../redux/items/scholarships/scholarships.actions'
import { getActiveJobs } from '../../../redux/items/jobs/jobs.actions'
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Media, Alert, Button } from 'reactstrap';
import SimilarScholarships from './SimilarScholarships';
import LatestJobs from './LatestJobs';

const ViewedScholarship = ({ allActiveJobs, allActiveScholarships, categories, getActiveJobs, getActiveScholarships }) => {
    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    // Lifecycle methods to load items
    useEffect(() => {
        getActiveJobs();
        getActiveScholarships();
    }, [getActiveJobs, getActiveScholarships]);

    // Access route parameters
    const { scholarshipSlug } = useParams()

    const scholarshipToUse = allActiveScholarships && allActiveScholarships.allActiveScholarships.find(scholarship => scholarship.slug === scholarshipSlug)

    const categoryToUse = scholarshipToUse && categories && categories.allCategories.find(category =>
        category.sub_category.find(subcat => subcat._id === scholarshipToUse.sub_category))

    return (
        <Container className="slick-job my-3 px-0 px-lg-3">

            <Row className="viewed-details mb-4">

                <Col sm="8" className="mx-0 px-0 px-lg-5 choosen-job">

                    {!allActiveScholarships.isLoading ?

                        <>
                            <Media className="mt-lg-2 p-3 border-bottom job-title d-flex flex-column flex-lg-row">

                                <Media left href="#" className="m-auto d-flex justify-content-center align-items-center">
                                    <img src={scholarshipToUse && scholarshipToUse.brand_image} alt="" />
                                </Media>

                                <Media body>
                                    <Media heading className="p-3 py-lg-0 mb-1 mb-md-0 h-100 d-flex flex-column justify-content-between">
                                        <strong className="text-info text-center mb-2">
                                            {scholarshipToUse && scholarshipToUse.title}
                                        </strong>

                                        <div className="d-flex flex-column flex-lg-row justify-content-between font-weight-bolder text-secondary mb-2">
                                            <h6 className="mb-1 mb-md-0">{scholarshipToUse && scholarshipToUse.brand}</h6>

                                            <p className="mb-1 mb-md-0">{categoryToUse && categoryToUse.sub_category.find(subcat => subcat._id === scholarshipToUse.sub_category).name}</p>
                                        </div>

                                        <div className="d-flex justify-content-between text-muted align-bottom">
                                            <p className="mb-1 mb-md-0 posted-on">
                                                Posted on {new Date(scholarshipToUse && scholarshipToUse.createdAt).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </p>

                                            <p className="mb-1 mb-md-0 deadline">
                                                Deadline:&nbsp;
                                                {new Date(scholarshipToUse && scholarshipToUse.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' :

                                                    (new Date(scholarshipToUse && scholarshipToUse.deadline) < yesterday) ? 'Closed' :

                                                        new Date(scholarshipToUse && scholarshipToUse.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </p>
                                        </div>
                                    </Media>

                                </Media>

                            </Media>

                            <div className="job-description px-3 py-4">
                                <h3 className="font-weight-bolder mb-3 text-uppercase">Scholarship Description</h3>

                                <Markdown rehypePlugins={[rehypeHighlight]}>{scholarshipToUse && scholarshipToUse.markdown}
                                </Markdown>

                                <a href="https://chat.whatsapp.com/Db3xfvRz9JB527FpPLzWl2">
                                    <Alert color="info" className="text-center">
                                        Click here to join okaziyo.com's WhatsApp group to receive updates
                                    </Alert>
                                </a>

                                <p className="font-weight-bolder share-text mt-4">
                                    Share this with your friends via &nbsp;
                                    <Button color="success" className="ml-1 py-1 px-2 mb-0 share-btn">
                                        <i className="fa fa-share-alt mr-1"></i>
                                        <a className="text-white" href={`https://api.whatsapp.com/send?phone=whatsappphonenumber&text=${scholarshipToUse && scholarshipToUse.title}
                                \n${window.location.href}`}>WhatsApp</a>
                                    </Button>
                                </p>

                            </div>
                        </> :

                        <div className="d-flex justify-content-center align-items-center">
                            <ReactLoading type="bars" color="#33FFFC" />
                        </div>}
                </Col>

                <Col sm="4" className="sidebar-content">
                    <SimilarScholarships allActiveScholarships={allActiveScholarships} scholarshipToUse={scholarshipToUse} categoryToUse={categoryToUse} />
                    <LatestJobs allActiveJobs={allActiveJobs && allActiveJobs} categories={categories} />
                </Col>
            </Row>

        </Container>
    )
}
// Map  state props
const mapStateToProps = state => ({
    allActiveJobs: state.jobsReducer,
    allActiveScholarships: state.scholarshipsReducer,
});

export default connect(mapStateToProps, { getActiveScholarships, getActiveJobs })(ViewedScholarship);