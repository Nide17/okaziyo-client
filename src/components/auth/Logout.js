import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { logout } from '../../redux/auth/auth.actions'

const Logout = ({ logout }) => {

  const logingout = () => {
    var signOut = window.confirm("Log out?");

    if (signOut) {
      logout()
      window.location.href = "/"
    }
    else return null
  }

  return (
    <a href="#/" onClick={logingout}>
      <i className="feather icon-power text-c-red f-16 m-r-10"></i>
    </a>

  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
