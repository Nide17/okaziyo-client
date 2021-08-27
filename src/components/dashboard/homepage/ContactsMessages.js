import React from 'react'
import avatar2 from "../assets/images/user/avatar-2.jpg"
import ReactLoading from "react-loading";

const ContactsMessages = ({ contacts }) => {

    return (

        <div className="col-xl-8 col-md-6">
            <div className="card Recent-Users">
                <div className="card-header">
                    <h5>Contacts</h5>
                </div>
                <div className="card-block px-0 py-3">
                    <div className="table-responsive">

                        {contacts.isLoading ?
                            <div className="d-flex justify-content-center align-items-center">
                                <ReactLoading type="spinningBubbles" color="#33FFFC" />
                            </div> :

                            <table className="table table-hover">
                                <tbody>

                                    {contacts && contacts.allContacts.map(category => (
                                        <tr className="unread" key={category._id}>

                                            <td><img className="rounded-circle" style={{ width: "40px" }} src={avatar2} alt="activity-user" /></td>

                                            <td>
                                                <h6 className="mb-1">{category.contact_name}</h6>
                                                <p className="m-0">{category.message}</p>
                                            </td>

                                            <td>
                                                <h6 className="text-muted">
                                                    {new Date(category.contact_date).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ?
                                                        'Ongoing' :
                                                        new Date(category.contact_date).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                </h6>
                                            </td>

                                            <td><a href="#!" className="label theme-bg2 text-white f-12">View</a><a href="#!" className="label theme-bg text-white f-12">Reply</a></td>

                                        </tr>))}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsMessages