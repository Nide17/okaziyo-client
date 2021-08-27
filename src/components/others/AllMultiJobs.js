import React, { useEffect } from 'react';
import { Container, Row, Card, Button, CardTitle, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { getMultijobs } from '../../redux/multijobs/multijobs.actions'

const AllMultiJobs = ({ multijobs, getMultijobs }) => {

    // Lifecycle methods to load multijobs
    useEffect(() => {
        getMultijobs();
    }, [getMultijobs]);

    return (
        <Container className="px-2 px-lg-4 multi-jobs">

            <Row className="mt-4 m-lg-5">
                <Alert className="alert-heading mx-auto w-100 text-center" color="success">
                    <h4>All Multi Jobs</h4>
                </Alert>
            </Row>

            {multijobs && multijobs.allMultijobs.map(multijob => (
                <Row className="px-lg-5">

                    <Card className="mb-3 mx-lg-5 px-1 px-lg-5" body outline color="warning">
                        <CardTitle tag="h5" className="multi-title mb-4">{multijob.title}</CardTitle>

                        <div className="d-flex justify-content-between">
                            <Button className="view-course ml-3">
                                <a href={`/view-multijobs/${multijob._id}`} className="text-white">Open Multi-Jobs</a>
                            </Button>

                            <span>
                                <small color="text-info">
                                    Posted on {new Date(multijob.createdAt).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </small>
                            </span>
                        </div>

                    </Card>
                </Row>))}
        </Container>
    );
};

// Map  state props
const mapStateToProps = state => ({ multijobs: state.multijobsReducer });

export default connect(mapStateToProps, { getMultijobs })(AllMultiJobs);