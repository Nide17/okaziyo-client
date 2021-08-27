import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import logo from '../../logo/Logo.svg'
import Logosm from '../../logo/Logosm.svg'
import ReactLoading from "react-loading";
import { connect } from 'react-redux'
import { getItems } from '../../redux/items/items.actions'

const Header = ({ categories, items, getItems }) => {

    const [clickedItem, setClickedItem] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('')

    // Lifecycle methods
    useEffect(() => {
        getItems();
    }, [getItems]);

    if (window.location.toString().includes("dashboard") || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.toString().includes("sell-now")) return null

    else return (

        <div className="container-fluid" id="main-header">

            <nav className="row navbar navbar-expand-lg navbar-light mx-0">

                <div className="col-7 col-lg-3 navbar-toggler-holder px-0">

                    <button className="navbar-toggler ml-2" type="button" onClick={() => setMenuOpen(!menuOpen)}>
                        <span>
                            <i className="fa fa-bars"></i>
                        </span>
                    </button>

                    <a className="navbar-brand d-none d-lg-flex" href="/">
                        <img src={logo} alt="logo" />
                    </a>

                    <a className="navbar-brand-small d-block d-lg-none ml-1" href="/">
                        <img src={Logosm} alt="Logosm" width="73px" height="30px" />
                    </a>
                </div>

                <div className="nav-buttons col-5 col-lg-3 d-flex d-lg-none px-0">
                    <button className="search-sm" onClick={() => setOpenSearch(!openSearch)}>
                        <i className="fa fa-search"></i>
                    </button>

                    <button className="btn sell mr-2 py-1 px-1" type="button">
                        <a href="/sell-now" className="text-white">Sell now!</a>
                    </button>
                </div>

                {/* SEARCH FOR LARGE*/}
                <div className={`nav-search w-100 ${openSearch ? 'show mt-2 mb-0 py-4' : 'd-lg-none'}`}>
                    <form className="px-1">
                        <div className="form-group row mx-1">
                            <input className="form-control" type="search" placeholder="What do you want to buy?" aria-label="Search" onChange={e => { setSearchKey(e.target.value) }} />
                            <button type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>

                        <ListGroup className="search-results mt-1 m-lg-0">
                            {items && items.allItems
                                .filter(item => {
                                    if (searchKey === "") {
                                        return null
                                    } else if (item.title.toLowerCase().includes(searchKey.toLowerCase())) {
                                        return item
                                    }
                                    return null
                                })
                                .map(item => (
                                    <ListGroupItem tag="a" href={`/view-item/${item._id}`} key={item._id} className="result-item">

                                        <ListGroupItemHeading className="d-flex justify-content-between align-items-center font-weight-bolder">
                                            <span>{item.title}</span>
                                            <span className="text-primary">
                                                {item.price > 0 ? `${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Rwf` : 'Negociable'}
                                            </span>
                                        </ListGroupItemHeading>

                                        <ListGroupItemText className="d-flex justify-content-between align-items-center">
                                            <span>{item.description}</span>
                                            <span className="text-dark">{item.contactNumber}</span>
                                        </ListGroupItemText>

                                    </ListGroupItem>))}
                        </ListGroup>
                    </form>
                </div>

                <div className={`nav-search col-12 col-lg-6 collapse navbar-collapse ${menuOpen ? 'show' : null}`}>

                    {/* SEARCH FOR MOBILE*/}
                    <form className="d-none d-sm-block">
                        <div className="form-group row">
                            <input className="form-control" type="search" placeholder="What do you want to buy?" aria-label="Search" onChange={e => { setSearchKey(e.target.value) }} />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </div>

                        <ListGroup className="search-results mt-1 mt-lg-0">
                            {items && items.allItems
                                .filter(item => {
                                    if (searchKey === "") {
                                        return null
                                    } else if (item.title.toLowerCase().includes(searchKey.toLowerCase())) {
                                        return item
                                    }
                                    return null
                                })
                                .map(item => (
                                    <ListGroupItem tag="a" href={`/view-item/${item._id}`} key={item._id} className="result-item">

                                        <ListGroupItemHeading className="d-flex justify-content-between align-items-center font-weight-bolder">
                                            <span>{item.title}</span>
                                            <span className="text-primary">
                                                {item.price > 0 ? `${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Rwf` : 'Negociable'}
                                            </span>
                                        </ListGroupItemHeading>

                                        <ListGroupItemText className="d-flex justify-content-between align-items-center">
                                            <span>{item.description}</span>
                                            <span className="text-dark">{item.contactNumber}</span>
                                        </ListGroupItemText>

                                    </ListGroupItem>))}
                        </ListGroup>
                    </form>

                    {/* CATEGORIES FOR MOBILE */}
                    {categories.isLoading ?
                        <div className="d-flex justify-content-center align-items-center d-lg-none">
                            <ReactLoading type="bars" color="#33FFFC" />
                        </div> :

                        <div className={"nav-buttons col-lg-3 d-flex d-lg-none justify-content-around mr-4 px-4"}>

                            <div className="auth d-flex justify-content-around w-100">
                                <a href="/register">
                                    <button className="btn my-1" type="button">Register</button>
                                </a>
                                <a href="/login">
                                    <button className="btn my-1" type="button">Login</button>
                                </a>
                            </div>

                            <div className="buy mt-3">

                                <ul className="categories-list-mobile">
                                    {categories && categories.allCategories.map((category, index) => (

                                        <li
                                            key={index}
                                            className={`category-item dropdown item-buy mt-3 ${index === clickedItem ? 'show-details' : null}`}>

                                            <a href={`/${category.title.toLowerCase().split(" ")[0]}/${category._id}`}>
                                                {category.title}</a> &nbsp;

                                            <i className="fa fa-angle-down" onClick={() => setClickedItem(clickedItem === null ? index : null)}></i>

                                            {/* dropdown */}
                                            <ul className="dropdown-menu">
                                                {category && category.sub_category.map(subc => (
                                                    <li key={subc._id} className="pt-2">
                                                        <a className="dropdown-item px-1" href={`/${category.title.toLowerCase().split(" ")[0]}/${subc.name.toLowerCase().split(" ")[0]}/${subc._id}`}>
                                                            {subc.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}

                                </ul>
                            </div>

                        </div>}
                </div>

                {/* FOR LARGE */}
                <div className={"nav-buttons col-6 col-lg-3 d-none d-lg-flex justify-content-around pl-0 mr-4"}>

                    <button className="btn sell mr-2 py-1 px-1" type="button">
                        <a href="/sell-now" className="text-white">Sell now!</a>
                    </button>
                    <a href="/register">
                        <button className="btn px-lg-2" type="button">Register</button>
                    </a>
                    <a href="/login"><button className="btn px-lg-2" type="button">Login</button></a>
                </div>
            </nav>
        </div>
    )
}
const mapStateToProps = state => ({
    items: state.itemsReducer
})

export default connect(mapStateToProps, { getItems })(Header)