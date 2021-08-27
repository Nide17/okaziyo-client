import React, { useEffect } from 'react'
import { ListGroup, ListGroupItem, Alert } from 'reactstrap'
import ReactLoading from "react-loading"
import { getMultijobs } from '../../redux/multijobs/multijobs.actions'
import { connect } from 'react-redux'

const MultiSuggested = ({ multijobs, getMultijobs }) => {

    // Lifecycle methods to load multijobs
    useEffect(() => {
        getMultijobs();
    }, [getMultijobs]);

    return (

        !multijobs.isLoading ?
            <div className="suggested-jobs mt-4 my-lg-2">
                <Alert color="dark">
                    Suggested Multi Jobs
                </Alert>

                <ListGroup>
                    {multijobs && multijobs.allMultijobs.sort(() => 0.5 - Math.random()).slice(0, 7).map((multijob) => (
                        <ListGroupItem tag="a" href="#" className="px-1 py-3 p-lg-2">
                            {multijob.title}

                            <br />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div> :
            <div className="d-flex justify-content-center align-items-center" style={{ height: "10vh" }}>
                <ReactLoading type="spinningBubbles" color="#33FFFC" />
            </div>
    )
}

// Map  state props
const mapStateToProps = state => ({
    multijobs: state.multijobsReducer
});

export default connect(mapStateToProps, { getMultijobs })(MultiSuggested);