import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

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
    const chartData = poll
      ? {
        labels: poll.choices.map(choice => choice.value),
        datasets: [{
          label: 'Votes',
          data: poll.choices.map(choice => choice.votes),
          backgroundColor: [
            '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#e67e22',
            '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
          ]
        }]
      }
      : {}

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
            <Doughnut data={chartData} />
            <p>Latest Votes:</p>
            <ul className='collection'>
              { poll.votes.reverse().slice(0, 5).map(vote => (
                <li className='collection-item' key={vote._id} title={`id: ${vote._user}`}>
                  {vote.username} voted for {poll.choices[vote.vote].value}
                </li>
              ))
              }
            </ul>
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
