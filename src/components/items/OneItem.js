import React, { useEffect } from 'react'
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOneItem } from '../../redux/items/items.actions'

const OneItem = ({ oneItem, getOneItem }) => {

    // Access route parameters
    const { itemId } = useParams()

    useEffect(() => {
        getOneItem(itemId);
    }, [getOneItem, itemId]);

    return (

        !oneItem.isLoading ?

            <Row className="mb-lg-5 px-lg-3">

                <Col className="mt-2 one-item-card mx-auto" sm="6">
                    <Card className="d-flex flex-row">
                        <CardImg top width="100%" src={oneItem.oneItem.pictures && oneItem.oneItem.pictures[0]} alt="Card image cap" className="w-25 pl-1" />
                        <CardBody className="py-3 w-75">
                            <CardTitle tag="h6" className="text-info font-weight-bold mb-1">{oneItem.oneItem.title}</CardTitle>

                            <CardSubtitle tag="small" className="mb-2 text-muted font-weight-bolder">{oneItem.oneItem.price > 0 ? `${oneItem.oneItem.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}Rwf` : 'Negociable'}</CardSubtitle>

                            <CardText><small>{oneItem.oneItem.description}</small></CardText>
                            <Button size="sm" color="success">
                                {oneItem.oneItem.contactNumber}
                            </Button>
                        </CardBody>
                    </Card>
                </Col>

            </Row> :

            <div className="vh-100 pt-5 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="success" style={{ width: '10rem', height: '10rem' }} />
            </div>)
}

const mapStateToProps = state => ({ oneItem: state.itemsReducer });

export default connect(mapStateToProps, { getOneItem })(OneItem)