import React, { useEffect } from 'react'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getItems } from '../../redux/items/items.actions'

const BrowseItems = ({ items, getItems }) => {

    // Lifecycle methods
    useEffect(() => {
        getItems(12);
    }, [getItems]);

    return (
        <section className="container things">
            <div className="row contents">
                <h4 className="col-12">{!items.isLoading ? "Browse new products to buy" : null}</h4>

                <div className="cards">

                    {items.isLoading ?

                        <div className="mx-auto">
                            <ReactLoading type="bars" color="#33FFFC" />
                        </div> :

                        <>
                            {items && items.allItems.map(item => (
                                <div key={item._id} className="col-6 col-md-3 col-xl-2 oneCard mb-1 mb-lg-5">
                                    <div className="item-holder">
                                        <Link to={`/view-item/${item._id}`} className="item">
                                            <img src={item.pictures[0]} alt="sell" />
                                            <h6>{item.title}</h6>
                                            <p className="price-phone d-flex justify-content-between">
                                                <span className="price">{item.price > 0 ? `${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}Rwf` : 'Negociable'}</span>
                                                <span className="contact">
                                                    <i className="bi bi-telephone-fill text-danger mr-1"></i>
                                                    {item.contactNumber}
                                                </span></p>
                                            <p className="desc">{item.description}</p>
                                        </Link>
                                    </div>
                                </div>))}
                        </>}

                </div>

                {!items.isLoading ?
                    <div className="col-12 load-more-holder">
                        <button className="btn load-more" type="button">
                            <Link to="/all-items" className="text-white">More items</Link>
                        </button>
                    </div> : null}
            </div>
        </section>
    )
}

// Map  state props
const mapStateToProps = state => ({
    items: state.itemsReducer,
});

export default connect(mapStateToProps, { getItems })(BrowseItems);