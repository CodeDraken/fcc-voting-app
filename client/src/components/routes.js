import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import PollPage from '../containers/PollPage'

export default (
  <Switch>
    <Route exact path='/polls/:id' component={PollPage} />
    <Route exact path='/' component={Home} />
  </Switch>
)
