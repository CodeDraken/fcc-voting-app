import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPolls } from '../actions/pollActions'

class Polls extends Component {
  static propTypes = {
    fetchPolls: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchPolls()
  }

  render () {
    console.log(this.props.polls)

    return (
      <div className='polls'>
        <h2>Polls</h2>
      </div>
    )
  }
}

const mapStateToProps = ({ polls }) => ({
  polls
})

export default connect(mapStateToProps, { fetchPolls })(Polls)
