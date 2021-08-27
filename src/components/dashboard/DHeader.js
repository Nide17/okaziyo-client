import React, { useState } from 'react'
import avatar1 from "./assets/images/user/avatar-1.jpg"
import avatar2 from "./assets/images/user/avatar-2.jpg"
import avatar3 from "./assets/images/user/avatar-3.jpg"
import Logout from './../auth/Logout'

const DHeader = ({ showMob, setShowMob }) => {

    const [searchOpen, setSearchOpen] = useState(false)

    return (

        <header className="navbar pcoded-header navbar-expand-lg navbar-light">

            <div className="m-header">

                <a className={`mobile-menu ${showMob ? 'on' : ''}`} id="mobile-collapse1" href="#/" onClick={() => setShowMob(!showMob)}>
                    <span></span>
                </a>

                <a href="#/" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-trending-up"></i>
                    </div>
                    <span className="b-title">Okaziyo</span>
                </a>
            </div>

            <a className="mobile-menu" id="mobile-header" href="#/">
                <i className="feather icon-more-horizontal"></i>
            </a>

            <div className="collapse navbar-collapse">

                <ul className="navbar-nav mr-auto" style={{ visibility: "hidden" }}>

                    <li className="nav-item">

                        <div className={`main-search ${searchOpen ? 'open' : ''}`}>

                            <div className="input-group pl-2 ml-1">
                            
                                <input type="text" style={{ width: `${searchOpen ? '120px' : '0px'}`}} id="m-search" className="form-control" placeholder=" Search . . ." />
                                
                                <a href="#/" className="input-group-append search-close">
                                    <i className="feather icon-x input-group-text" onClick={() => setSearchOpen(false)}></i>
                                </a>

                                <span className="input-group-append search-btn btn btn-primary" onClick={() => setSearchOpen(true)}>

                                    <i className="feather icon-search input-group-text"></i>
                                </span>
                            </div>
                        </div>

                    </li>

                </ul>


                <ul className="navbar-nav ml-auto">

                    <li style={{ visibility: "hidden" }}>
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#/" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>

                            <div className="dropdown-menu dropdown-menu-right notification">

                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href="#/" className="m-r-10">mark as read</a>
                                        <a href="#/">clear all</a>
                                    </div>
                                </div>

                                <ul className="noti-body">

                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>

                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={avatar1} alt="Generic placeholder imge" />
                                            <div className="media-body">
                                                <p><strong>John Doe</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>New ticket Added</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>

                                    <li className="notification">

                                        <div className="media">
                                            <img className="img-radius" src={avatar2} alt="Generic placeholder imge" />
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={avatar3} alt="Generic placeholder imge" />
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href="#/">show all</a>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li style={{visibility: "hidden"}}>
                        <div className="dropdown drp-user">
                            <a href="#/" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon feather icon-settings"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right profile-notification">

                                <div className="pro-head">
                                    <img src={avatar1} className="img-radius" alt="User-Profile" />
                                    <span>John Doe</span>
                                    <a href="auth-signin.html" className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"></i>
                                    </a>
                                </div>

                                <ul className="pro-body">
                                    <li><a href="#/" className="dropdown-item"><i className="feather icon-settings"></i> Settings</a></li>

                                    <li><a href="#/" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>

                                    <li><a href="message.html" className="dropdown-item"><i className="feather icon-mail"></i> My Messages</a></li>

                                    <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Lock Screen</a></li>
                                </ul>

                            </div>
                        </div>
                    </li>

                    <li>
                        <Logout />
                    </li>


                </ul>
            </div>
        </header>
    )
}

export default DHeader
