import React, { useEffect } from 'react';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOneMultijobs } from '../../redux/multijobs/multijobs.actions'
import MultiSuggested from './MultiSuggested'

const ViewMultiJobs = ({ oneMultijobs, getOneMultijobs }) => {

    // Access route parameters
    const { multijobsId } = useParams()

    // Lifecycle methods to load multijobs
    useEffect(() => {
        getOneMultijobs(multijobsId);
    }, [getOneMultijobs, multijobsId]);

    return (
        <Container className="view-multijobs">

            <Row className="mt-3 my-lg-5">
                <Alert color="success">
                    <h4 className="alert-heading mx-auto">{oneMultijobs.oneMultijobs.title}</h4>
                </Alert>
            </Row>

            <Row className="mx-2 px-lg-2">

                <Col sm="8" className="mx-0 px-0 px-lg-2 choosen-job">

                    <div className="job-description mx-lg-3 py-3">
                        <Markdown rehypePlugins={[rehypeHighlight]}>
                            {oneMultijobs.oneMultijobs && oneMultijobs.oneMultijobs.markdown}
                        </Markdown>

                        <a href="https://chat.whatsapp.com/Db3xfvRz9JB527FpPLzWl2">
                            <Alert color="info" className="text-center p-2 p-lg-3">
                                Click here to join okaziyo.com's WhatsApp group to receive updates
                            </Alert>
                        </a>

                        <p className="font-weight-bolder share-text mt-4">
                            Share this with your friends via &nbsp;
                            <Button color="success" className="ml-1 py-1 px-2 mb-0 share-btn">
                                <i className="fa fa-share-alt mr-1"></i>
                                <a className="text-white" href={`https://api.whatsapp.com/send?phone=whatsappphonenumber&text=${oneMultijobs.oneMultijobs.title}
                                \n${window.location.href}`}>WhatsApp</a>
                            </Button>
                        </p>

                    </div>
                </Col>

                <Col sm="4" className="sidebar-content px-0">
                    <MultiSuggested />
                </Col>
            </Row>

        </Container>
    );
};

// Map  state props
const mapStateToProps = state => ({ oneMultijobs: state.multijobsReducer });
export default connect(mapStateToProps, { getOneMultijobs })(ViewMultiJobs);