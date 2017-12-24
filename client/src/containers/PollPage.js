import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSinglePoll } from '../actions/pollActions'
import Loader from '../components/Loader'

class PollPage extends Component {
  static propTypes = {
    fetchSinglePoll: PropTypes.func.isRequired,
    auth: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    match: PropTypes.object
  }

  pollInState = () => {
    if (!this.props.polls) {
      // no polls in state so user did not get here from homepage
      return false
    }

    const { id } = this.props.match.params
    const match = this.props.polls.filter(poll => poll._id === id)

    if (match.length > 0) {
      return match[0]
    }
    return false
  }

  componentDidMount () {
    const pollInState = this.pollInState()

    // if poll not in state fetch it
    if (!pollInState) {
      this.props.fetchSinglePoll(this.props.match.params.id)
    }
  }

  render () {
    const poll = this.pollInState()

    return poll
    ? (
      <div>
        <h2>{poll.title}</h2>
      </div>
    )
    : <Loader />
  }
}

const mapStateToProps = ({ polls, auth }) => ({
  polls: polls ? polls.polls : null,
  auth
})

export default connect(mapStateToProps, { fetchSinglePoll })(PollPage)
