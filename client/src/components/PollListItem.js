import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const PollListItem = ({ createdAt, ownerName, title, totalVotes, _id }) => (
  <li className='poll-list-item' title={title}>
    <Link to={`/polls/${_id}`} className='poll-list-item-inner'>

      <h5 className='title'>
        { title.substr(0, 20) }
        <small> ( {totalVotes} votes )</small>
      </h5>

      <footer>
        <p>Created by <strong>{ownerName}</strong><br />
          <em>
            {new Date(createdAt).toLocaleString()}
          </em>
        </p>
      </footer>

    </Link>
  </li>
)

PollListItem.propTypes = {
  createdAt: PropTypes.string,
  ownerName: PropTypes.string,
  title: PropTypes.string,
  totalVotes: PropTypes.number,
  _id: PropTypes.string
}

export default PollListItem
