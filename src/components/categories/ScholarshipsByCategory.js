import React, { useState, useEffect } from 'react'
import { Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCategoryScholarships } from '../../redux/items/scholarships/scholarships.actions'
import ItemsPagination from '../items/ItemsPagination'

const ScholarshipsByCategory = ({ categories, scholarships, getCategoryScholarships }) => {

    // Access route parameters
    const { categoryId } = useParams()
    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    // Lifecycle methods
    useEffect(() => {
        getCategoryScholarships(categoryId, pageNo);
        setNumberOfPages(scholarships.totalCatPages);
    }, [getCategoryScholarships, pageNo, scholarships.totalCatPages, categoryId]);

    return (
        <section className="container things all">

            {scholarships.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type="bars" color="#33FFFC" style={{ width: "120px", height: "120px", fill: "#499167" }} />
                </div> :

                <div className="row contents mb-5 mx-1 mx-lg-3">

                    {scholarships && scholarships.catScholarships.length > 0 ?
                        <>
                            <h4 className="col-12 mb-4">Scholarships that should interest you from this category</h4>

                            <div className="cards by-category">
                                {scholarships && scholarships.catScholarships.map(scholarship => {

                                    const categoryToUse = categories && categories.allCategories.find(category =>
                                        category.sub_category.find(subcat => subcat._id === scholarship.sub_category))

                                    return (

                                        <div key={scholarship._id} className="col-6 col-md-3 px-1 px-lg-2">

                                            <Card>
                                                <div className="img-holder mx-auto">
                                                    <CardImg top src={scholarship.brand_image} alt={scholarship.brand} />
                                                </div>

                                                <CardBody>
                                                    <CardTitle tag="h6">{scholarship.title}</CardTitle>
                                                    <CardSubtitle tag="p" className="mb-2 text-muted">{scholarship.brand}</CardSubtitle>

                                                    <CardText className="card-body text-center py-0 px-lg-2 d-flex justify-content-between align-items-center">
                                                        <span className="card-link">
                                                            <small>
                                                                {categoryToUse && categoryToUse.sub_category.find(subcat => subcat._id === scholarship.sub_category).name}
                                                            </small>
                                                        </span>

                                                        <span className="card-link deadline text-danger">
                                                            
                                                            <small className={`text-${new Date(scholarship.deadline) < yesterday ? 'danger' : 'primary'}`}>
                                                                Deadline:&nbsp;
                                                                {new Date(scholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' :

                                                                    (new Date(scholarship.deadline) < yesterday) ? 'Closed' :

                                                                        new Date(scholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}

                                                            </small>
                                                        </span>

                                                    </CardText>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <a href={`/slickScholarship/${scholarship.slug}`} className="slickItem-button card-link btn btn-success px-0">View more</a>

                                                        <span href="/" className="card-link ml-lg-1">
                                                            Posted on {new Date(scholarship.updatedAt).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
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
                            No scholarships available in this category
                        </Alert>}

                </div>}
        </section>)
}

// Map  state props
const mapStateToProps = state => ({
    scholarships: state.scholarshipsReducer,
});

export default connect(mapStateToProps, { getCategoryScholarships })(ScholarshipsByCategory);