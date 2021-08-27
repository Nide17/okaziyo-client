import React, { useState, useEffect } from 'react'
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { getPaginationItems } from '../../redux/items/items.actions'
import ItemsPagination from './ItemsPagination'

const MoreItems = ({ items, getPaginationItems }) => {
    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // Lifecycle methods
    useEffect(() => {
        getPaginationItems(pageNo);
        setNumberOfPages(items.totalPages);
    }, [getPaginationItems, pageNo, items.totalPages]);

    return (
        <section className="container things all">

            {items.isPaginationLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <ReactLoading type="bars" color="#33FFFC" style={{ width: "120px", height: "120px", fill: "#499167"}}/>
                </div> :

            <div className="row contents mb-5">
                <h4 className="col-12">More products to buy</h4>

                <div className="cards">

                        <>
                            {items && items.allPaginationItems.map(item => (
                                <div key={item._id} className="col-6 col-md-3 col-xl-2 oneCard">
                                    <div className="item-holder">
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
                        </>
                </div>

                <ItemsPagination pageNo={pageNo} setPageNo={setPageNo} numberOfPages={numberOfPages} />

            </div>}
        </section>
    )
}

// Map  state props
const mapStateToProps = state => ({
    items: state.itemsReducer,
});

export default connect(mapStateToProps, { getPaginationItems })(MoreItems);