import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPolls } from '../actions/pollActions'
import PollList from '../components/PollList'

class Polls extends Component {
  static propTypes = {
    fetchPolls: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (!this.props.polls || !this.props.polls.length > 0) {
      this.props.fetchPolls()
    }
  }

  render () {
    const polls = this.props.polls
      ? this.props.polls.polls
      : null

    return (
      <div className='polls'>
        <h2 className='red-text thick-text'>Find a Poll</h2>
        { polls && polls.length > 0
          ? <PollList polls={polls} />
          : <h3>Looking for polls...</h3>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ polls }) => ({
  polls
})

export default connect(mapStateToProps, { fetchPolls })(Polls)
