import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchMyPolls } from '../actions/pollActions'
import PollList from '../components/PollList'

class Polls extends Component {
  static propTypes = {
    fetchMyPolls: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchMyPolls()
  }

  render () {
    const polls = this.props.polls
      ? this.props.polls.polls.filter(poll =>
          poll._owner === this.props.auth._id)
      : null

    return (
      <div className='polls center-align'>
        <h2 className='blue-text thick-text'>Your Polls</h2>
        { polls && polls.length > 0
          ? <PollList polls={polls} />
          : <h3>Looking for polls...</h3>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ polls, auth }) => ({
  polls,
  auth
})

export default connect(mapStateToProps, { fetchMyPolls })(Polls)
