import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSinglePoll } from '../actions/pollActions'
import Loader from '../components/Loader'
import VoteForm from './VoteForm'
import randColor from '../utils/randColor'

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
        <h3 className={`center-align ${randColor()}-text thick-text`}>
          {poll.title}
          <br />
          <small>Created by {poll.ownerName} on {new Date(poll.createdAt).toLocaleDateString()}</small>
        </h3>

        <div className='poll-area row'>
          <div className='col s12 m6'>
            <h4 className='center-align'>Votes: {poll.totalVotes}</h4>
          </div>

          <div className='col s12 m6'>
            <h4 className='center-align'>Place your vote:</h4>
            <VoteForm poll={poll} auth={this.props.auth} />
          </div>
        </div>

      </div>
    )
    : <Loader />
  }
}

const mapStateToProps = ({ polls }) => ({
  polls: polls ? polls.polls : null
})

export default connect(mapStateToProps, { fetchSinglePoll })(PollPage)
