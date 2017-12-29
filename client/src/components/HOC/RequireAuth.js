// RequireAuth HOC - if user not logged in redirect

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

export default (ComposedComponent) => {
  class Authentication extends Component {
    static propTypes = {
      history: PropTypes.object,
      authenticated: PropTypes.Boolean
    }

    componentWillMount () {
      if (!this.props.authenticated) {
        this.props.history.push('/')
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/')
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ auth }) => ({
    authenticated: !!auth.githubId
  })

  return connect(mapStateToProps)(withRouter(Authentication))
}
