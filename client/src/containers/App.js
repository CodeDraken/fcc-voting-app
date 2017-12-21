import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'
import routes from '../components/routes'
import Header from './Header'

class App extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getCurrentUser()
  }

  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className='container'>
            { routes }
          </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App)
