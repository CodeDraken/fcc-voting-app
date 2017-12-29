import React from 'react'

export default props => (
  <div>
    <h2>Loading...</h2>
    <div className='progress'>
      <div className='indeterminate' />
    </div>
    <p>If nothing loads perhaps there's nothing here or you've made a bad request. :(</p>
  </div>
)
