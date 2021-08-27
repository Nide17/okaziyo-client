import React, { useState } from 'react'

const NavigationSell = ({ categories, showMob }) => {

    const [navBarCollapsed, setNavBarCollapsed] = useState(false)

    return (

        <nav className={`pcoded-navbar ${showMob ? 'mob-open' : navBarCollapsed ? 'navbar-collapsed' : ''}`}>

            <div className="navbar-wrapper">

                <div className="navbar-brand header-logo">
                    <a href="/" className="b-brand">
                        <div className="b-bg">
                            <i className="feather icon-trending-up"></i>
                        </div>
                        <span className="b-title">Okaziyo</span>
                    </a>
                    <a className={`mobile-menu ${navBarCollapsed ? 'on' : ''}`} id="mobile-collapse" href="#/" onClick={() => setNavBarCollapsed(!navBarCollapsed)}>
                        <span></span>
                    </a>
                </div>

                <div className="navbar-content scroll-div">

                    <ul className="nav pcoded-inner-navbar">

                        <li className="nav-item active">
                            <a href="/dashboard" className="nav-link ">
                                <span className="pcoded-micon">
                                    <i className="feather icon-home"></i>
                                </span>
                                <span className="pcoded-mtext">Dashboard</span></a>
                        </li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Items Categories</label>
                        </li>

                        {categories && categories.allCategories.map(category => (

                            (category._id === '60cddc21181fa53764a17296' || category._id === '60cddc0f181fa53764a17295') ? null :

                                <li key={category._id} className="nav-item">
                                    <a href={`/sell-now/${category._id}`} className="nav-link ">
                                        <span className="pcoded-micon">
                                            <i className="feather icon-file-text"></i>
                                        </span>
                                        <span className="pcoded-mtext">{category.title}</span></a>
                                </li>
                        ))}

                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default NavigationSell