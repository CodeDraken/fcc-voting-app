import React from 'react'
import PropTypes from 'prop-types'

import PollListItem from './PollListItem'

const PollList = ({ polls }) => (
  <ul>
    { console.log(polls) }
    { polls.map(poll => (
      <PollListItem key={poll._id} {...poll} />
    )) }
  </ul>
)

PollList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PollList
