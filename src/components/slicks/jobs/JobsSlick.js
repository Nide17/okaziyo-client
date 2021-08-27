import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux';
import { getActiveJobs } from '../../../redux/items/jobs/jobs.actions'
import ReactLoading from "react-loading";
import Slider from 'react-slick'
import '../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../node_modules/slick-carousel/slick/slick-theme.css'
import '../slickItem.css'
import settings from '../slickSettings'
const SlickJobPlaceholder = lazy(() => import('./SlickJobPlaceholder'));

const JobsSlick = ({ categories, allActiveJobs, getActiveJobs }) => {

  // Lifecycle methods to load items
  useEffect(() => {
    getActiveJobs();
  }, [getActiveJobs]);

  return (
    !allActiveJobs.isLoading ?
      <section className="container featured">
        <div className="container">
          <h5 className="lead text-left mb-4 ml-md-5 font-weight-bold">New Jobs</h5>
          <Slider {...settings}>
            {
              allActiveJobs && allActiveJobs.allActiveJobs.map((job) => (
                <Suspense
                  key={job._id}
                  fallback={

                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>}>
                  <SlickJobPlaceholder categories={categories} slickJob={job} />
                </Suspense>))
            }
          </Slider>
        </div>
      </section> :
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <ReactLoading type="bubbles" style={{ width: "120px", height: "120px", fill: "#499167" }} />
      </div>)
}

// Map  state props
const mapStateToProps = state => ({
  allActiveJobs: state.jobsReducer
});

export default connect(mapStateToProps, { getActiveJobs })(JobsSlick);