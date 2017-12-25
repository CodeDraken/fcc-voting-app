import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { vote } from '../actions/pollActions'
import FormField from '../components/FormField'

const VoteForm = ({ poll, vote, handleSubmit }) => {
  console.log(poll)
  return (
    <form
      onSubmit={handleSubmit(({customVote, voteOption}) => vote(
        poll._id,
        customVote
          ? { value: customVote }
          : voteOption
      )

      )}
    >
      <Field
        component={FormField}
        Element='input'
        type='text'
        _name='customVote'
        label='Custom Vote'
        name='customVote'
      />

      {
        poll.choices.map((choice, i) => (
          <p key={choice._id}>
            <Field
              id={choice._id}
              component='input'
              type='radio'
              value={i}
              name='voteOption'
            />
            <label htmlFor={choice._id}>{choice.value}</label>
          </p>
        ))
      }

      <button className='teal btn-flat white-text'>
        Vote
        <i className='material-icons right'>done</i>
      </button>
    </form>
  )
}

const validate = values => {
  const errors = {}

  return errors
}

const withForm = reduxForm({
  form: 'voteForm',
  validate
})(VoteForm)

export default connect(null, { vote })(withForm)
