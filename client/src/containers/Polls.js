import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPolls } from '../actions/pollActions'
import PollList from '../components/PollList'
import Loader from '../components/Loader'

class Polls extends Component {
  static propTypes = {
    fetchPolls: PropTypes.func.isRequired
  }

  componentDidMount () {
    // if (!this.props.polls || this.props.polls.length < 1) {
    this.props.fetchPolls()
    // }
  }

  render () {
    const polls = this.props.polls
      ? this.props.polls.polls
      : null

    return (
      <div className='polls'>
        <h2 className='blue-text thick-text'>Find a Poll</h2>

        <ul className='pagination'>

          <p><strong>Page:</strong></p>

          <button type='button' className='waves-effect btn-flat'
            onClick={() => this.props.polls.page > 0 ? this.props.fetchPolls(this.props.polls.page - 1) : null}
          >
            <i className='material-icons'>chevron_left</i>
          </button>

          <li className='active'>
            <a href='#!'>{this.props.polls ? +this.props.polls.page + 1 : 1}</a>
          </li>

          <button type='button' className='waves-effect btn-flat'
            onClick={() => this.props.fetchPolls(+this.props.polls.page + 1)}
          >
            <i className='material-icons'>chevron_right</i>
          </button>
          <br />
          <small>( won't change if there are no more pages )</small>
        </ul>

        { polls && polls.length > 0
          ? <PollList polls={polls} />
          : <Loader />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ polls }) => ({
  polls
})

export default connect(mapStateToProps, { fetchPolls })(Polls)
