import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { vote } from '../actions/pollActions'
import FormField from '../components/FormField'

const VoteForm = ({ poll, vote, handleSubmit }) => {
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
      <p>
        <a
          className='btn-flat blue white-text'
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=vote%20on%20this%20poll:`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Tweet
        </a>
        <button className='teal btn-flat white-text right'>
          Vote
          <i className='material-icons right'>done</i>
        </button>
      </p>

      <Field
        component={FormField}
        Element='input'
        type='text'
        _name='customVote'
        label='Custom Vote'
        name='customVote'
      />

      { poll.choices.map((choice, i) => (
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
        ))}

      {/* <select> support requires jQuery to work
        <div>
          <label>Choices:</label>
          <div class='input-field'>
            <Field name='voteOption' component='select'>
              <option />
              <option value='ff0000'>Red</option>
              {
                poll.choices.map((choice, i) => (
                  <option label={choice.value} key={choice._id} value={i}>
                    {choice.value}
                  </option>
                ))
              }
            </Field>
          </div>
        </div>
      */}
    </form>
  )
}

const validate = values => {
  const errors = {}

  if (!values.voteOption && !values.customVote) {
    errors.customVote = 'Please choose an option or create a new one'
  }

  return errors
}

const withForm = reduxForm({
  form: 'voteForm',
  validate
})(VoteForm)

export default connect(null, { vote })(withForm)
