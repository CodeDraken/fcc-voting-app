import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import LoginOutBtn from '../components/LoginOutBtn'

export class Header extends Component {
  static propTypes = {
    // can be a user obj, anonymous user obj, or false
    auth: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ])
  }

  render () {
    return (
      <nav className='deep-purple'>
        <div className='nav-wrapper'>
          <Link to='/' className='left brand-logo'>
            VoteDraken
            <small> - Create polls and vote on them</small>
          </Link>
          <ul className='right'>
            {this.props.auth.githubId
              ? <li><Link to='/polls/new'>Create a Poll</Link></li>
              : null
            }
            <li><Link to='/me'>Welcome, {this.props.auth.username}</Link></li>
            <LoginOutBtn user={this.props.auth} />
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(Header)
