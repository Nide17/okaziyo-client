import React from 'react'
import { Media, Alert } from 'reactstrap';

const SimilarScholarships = ({ allActiveScholarships, scholarshipToUse, categoryToUse }) => {

    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    return (

        <div className="similar-jobs mt-4 mt-lg-2">
            <Alert color="dark">
                Other Scholarships
            </Alert>

            {allActiveScholarships && allActiveScholarships.allActiveScholarships.sort(() => 0.5 - Math.random()).slice(0, 7).map((scholarship) => (

                scholarship._id === scholarshipToUse._id ? null :

                    <Media key={scholarship._id} className="mt-1 mt-2 p-3 border-bottom job-title d-flex flex-column flex-lg-row">

                        <Media left href="#" className="m-auto d-flex justify-content-center align-items-center">
                            <img src={scholarship.brand_image} alt={scholarship.brand} />
                        </Media>

                        <Media body className="w-100">
                            <Media heading className="p-2 py-lg-0 mb-0 h-100 d-flex flex-column justify-content-between">
                                <p className="text-info mt-0 mb-2">
                                    <a href={`/slickScholarship/${scholarship.slug}`}>{scholarship.title}</a>
                                </p>

                                <div className="d-flex flex-column flex-lg-row justify-content-between text-secondary m-0">
                                    <p className="mb-1">{scholarship.brand}</p>
                                </div>

                                <div className="d-flex justify-content-between text-muted align-bottom">
                                    <small>
                                        {categoryToUse && categoryToUse.sub_category.find(subcat => subcat._id === scholarship.sub_category).name}
                                    </small>

                                    <small className={`text-${new Date(scholarship.deadline) < yesterday ? 'danger' : 'primary'}`}>
                                        Deadline:&nbsp;
                                        {new Date(scholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' :

                                            (new Date(scholarship.deadline) < yesterday) ? 'Closed' :

                                                new Date(scholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                    </small>

                                </div>
                            </Media>

                        </Media>

                    </Media>
            ))}
        </div>
    )
}

export default SimilarScholarships