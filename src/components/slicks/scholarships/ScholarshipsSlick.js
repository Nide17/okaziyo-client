import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux';
import { getActiveScholarships } from '../../../redux/items/scholarships/scholarships.actions'
import ReactLoading from "react-loading";
import Slider from 'react-slick'
import '../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../node_modules/slick-carousel/slick/slick-theme.css'
import '../slickItem.css'
import settings from '../slickSettings'
const SlickScholarshipPlaceholder = lazy(() => import('./SlickScholarshipPlaceholder'));

const ScholarshipSlick = ({ categories, allActiveScholarships, getActiveScholarships }) => {

    // Lifecycle methods to load items
    useEffect(() => {
        getActiveScholarships();
    }, [getActiveScholarships]);

    return (
        !allActiveScholarships.isLoading ?
            <section className="container featured">
                <div className="container">
                    <h5 className="lead text-left mb-4 ml-md-5 font-weight-bold">New Scholarships</h5>
                    <Slider {...settings}>
                        {
                            allActiveScholarships && allActiveScholarships.allActiveScholarships.map((scholarship) => (
                                <Suspense
                                    key={scholarship._id}
                                    fallback={
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>}>
                                    <SlickScholarshipPlaceholder categories={categories} slickScholarship={scholarship} />
                                </Suspense>))
                        }
                    </Slider>
                </div>
            </section> : <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                <ReactLoading type="bubbles" style={{ width: "120px", height: "120px", fill: "#499167" }} />
            </div>)
}

// Map  state props
const mapStateToProps = state => ({
    allActiveScholarships: state.scholarshipsReducer
});

export default connect(mapStateToProps, { getActiveScholarships })(ScholarshipSlick);