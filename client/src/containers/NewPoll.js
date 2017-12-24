import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter, Link } from 'react-router-dom'

import { newPoll } from '../actions/pollActions'
import FormField from '../components/FormField'

export class NewPoll extends Component {
  submitForm = values => {
    this.props.newPoll({ ...values, history: this.props.history })
  }

  render () {
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
      >
        <Field
          component={FormField}
          Element='input'
          type='text'
          _name='title'
          label='Poll Title'
          name='title'
        />

        <Field
          component={FormField}
          Element='textarea'
          type='text'
          _name='choices'
          label='Poll Choices - separated by new lines'
          name='choices'
        />

        <Link to='/' className='red btn-flat white-text'>
          Cancel
        </Link>
        <button className='teal btn-flat right white-text'>
          Create Poll
          <i className='material-icons right'>done</i>
        </button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = `You must give your poll a title/question!`
  }

  if (!values.choices) {
    errors.choices = `You must give your poll some choices`
  }

  return errors
}

const withForm = reduxForm({
  form: 'newPollForm',
  validate
})(NewPoll)

const mapStateToProps = ({ form: { newPollForm: values } }) => ({
  ...values
})

export default connect(mapStateToProps, { newPoll })(withRouter(withForm))
