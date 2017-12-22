import React from 'react'
import PropTypes from 'prop-types'

const PollListItem = ({ createdAt, ownerName, title, totalVotes, _id }) => (
  <li className='poll-list-item'>
    <div className='poll-list-item-inner'>

      <h5 className='title'>
        { title }
        <br />
        <small>Votes: {totalVotes}</small>
      </h5>

      <footer>
        <p>Created by: <strong>{ownerName}</strong> on
          <em>
            {new Date(createdAt).toLocaleString()}
          </em>
        </p>
      </footer>

    </div>
  </li>
)

PollListItem.propTypes = {

}

export default PollListItem
