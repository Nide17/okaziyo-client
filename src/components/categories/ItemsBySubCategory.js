import React, { useState, useEffect } from 'react'
import { Alert } from 'reactstrap';
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { getSubCategoryItems } from '../../redux/items/items.actions'
import ItemsPagination from '../items/ItemsPagination'

const ItemsBySubCategory = ({ items, getSubCategoryItems }) => {

    // Access route parameters
    const { subCategoryId } = useParams()
    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // Lifecycle methods
    useEffect(() => {
        getSubCategoryItems(subCategoryId, pageNo);
        setNumberOfPages(items.totalPages);
    }, [getSubCategoryItems, pageNo, items.totalPages, subCategoryId]);

    return (
        <section className="container things all">

            {items.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type="bars" color="#33FFFC" style={{ width: "120px", height: "120px", fill: "#499167" }} />
                </div> :

                <div className="row contents mb-5">

                    {items && items.subCatItems.length > 0 ?
                        <>
                            <h4 className="col-12 mb-4">Products to buy from this sub-category</h4>

                            <div className="cards">
                                {items && items.subCatItems.map(item => (

                                    <div key={item._id} className="col-6 col-md-3 col-xl-2 oneCard">
                                        <div className="item-holder mx-auto">
                                            <div className="item">
                                                <img src={item.pictures[0]} alt="sell" />
                                                <h6>{item.title}</h6>
                                                <p className="price-phone d-flex justify-content-between">
                                                    <span className="price">{item.price > 0 ? `${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}Rwf` : 'Negociable'}</span>
                                                    <span className="contact">
                                                        <i className="bi bi-telephone-fill text-danger mr-1"></i>
                                                        {item.contactNumber}
                                                    </span></p>
                                                <p className="desc">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                            <ItemsPagination pageNo={pageNo} setPageNo={setPageNo} numberOfPages={numberOfPages} />
                        </> :

                        <Alert color="danger" className="w-100">
                            No items available in this sub-category
                        </Alert>}
                </div>}
        </section>
    )
}

// Map  state props
const mapStateToProps = state => ({
    items: state.itemsReducer,
});

export default connect(mapStateToProps, { getSubCategoryItems })(ItemsBySubCategory);