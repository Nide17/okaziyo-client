import React from 'react'

const SlickScholarshipPlaceholder = ({ slickScholarship, categories }) => {
    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    const categoryToUse = categories && categories.allCategories.find(category =>
        category.sub_category.find(subcat => subcat._id === slickScholarship.sub_category))

    return (
        <div className="slickItem-card card mx-auto my-0">
            <div className="img-holder">
                <img src={slickScholarship.brand_image} alt={slickScholarship.brand} className="card-img-top img-fluid" />
            </div>

            <div className="card-body body-holder pt-2">
                <h6 className="card-text slickItem-description text-center mx-2 my-0 mx-lg-3">
                    {slickScholarship.title}
                </h6>

                <div className="card-body text-center pb-1 mx-2 mx-lg-3">
                    <p className="card-text instructor">
                        <span>at </span>
                        <a href="#/">{slickScholarship.brand}</a>
                    </p>
                </div>

                <div className="card-body text-center py-0 px-lg-4 d-flex justify-content-between">
                    <span className="card-link">
                        <small>
                            {categoryToUse && categoryToUse.sub_category.find(subcat => subcat._id === slickScholarship.sub_category).name}
                        </small>
                    </span>
                    <span className="card-link deadline">

                        <small className={`text-${new Date(slickScholarship.deadline) < yesterday ? 'danger' : 'primary'}`}>
                            Deadline:&nbsp;
                            {new Date(slickScholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ? 'Ongoing' :

                                (new Date(slickScholarship.deadline) < yesterday) ? 'Closed' :

                                    new Date(slickScholarship.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}

                        </small>

                    </span>
                </div>

                <div className="card-body text-center pb-1">

                    <a href={`/slickScholarship/${slickScholarship.slug}`} className="slickItem-button card-link btn btn-primary">View scholarship</a>

                    <span href="/" className="card-link ml-lg-5">
                        Posted on {new Date(slickScholarship.updatedAt).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>

                </div>

            </div>
        </div>
    )
}

export default SlickScholarshipPlaceholder;