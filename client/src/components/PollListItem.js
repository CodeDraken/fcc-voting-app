import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import randColor from '../utils/randColor'

const PollListItem = ({ createdAt, ownerName, title, totalVotes, _id }) => (
  <li className='poll-list-item' title={title}>
    <Link to={`/polls/${_id}`} className='poll-list-item-inner'>

      <h5 className={`title ${randColor()}-text`}>
        { title.substr(0, 20) }
        <small> ( {totalVotes} votes )</small>
      </h5>

      <footer>
        <p>Created by <strong className='indigo-text'>{ownerName}</strong> on
          <em className='cyan-text'>
            {new Date(createdAt).toLocaleDateString()}
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
