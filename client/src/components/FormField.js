// FormField - renders a single label and a text input
import React from 'react'

export default ({ Element, input, label, _name, meta: { error, touched } }) => {
  const valid = touched && error ? 'invalid' : ''

  return (
    <div>
      <label htmlFor={_name}>
        { label }
        <Element className={'validate ' + valid} {...input} style={{ marginBottom: '5px' }} />
        <div className='red-text' style={{ marginBottom: '20px' }}>
          { touched && error }
        </div>
      </label>
    </div>
  )
}
