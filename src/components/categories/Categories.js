import React from 'react'
import ReactLoading from "react-loading";

const Categories = ({ categories }) => {

    if (window.location.toString().includes("dashboard") || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.toString().includes("sell-now")) return null

    else return (
        <section className="categories d-none d-lg-block">

            <ul className="categories-list">

                {categories.isLoading ?
                    <div className="d-none d-lg-flex justify-content-center align-items-center">
                        <ReactLoading type="bars" color="#499167" />
                    </div> :

                    <>
                        {categories && categories.allCategories.map(category => (
                            <li className="category-item dropdown" key={category._id}>
                                <a href={`/${category.title.toLowerCase().split(" ")[0]}/${category._id}`}>
                                    {category.title}</a> &nbsp;
                                <i className="fa fa-angle-down"></i>

                                {/* dropdown */}
                                <ul className="dropdown-menu">
                                    {category && category.sub_category.map(subc => (
                                        <li key={subc._id}>
                                            <a
                                                className="dropdown-item px-1"
                                                href={`/${category.title.toLowerCase().split(" ")[0]}/${subc.name.toLowerCase().split(" ")[0]}/${subc._id}`}>
                                                {subc.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>))}
                    </>
                }

            </ul>
        </section>
    )
}

export default Categories