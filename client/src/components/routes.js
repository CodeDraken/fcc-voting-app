import React from 'react'
import { Route, Switch } from 'react-router-dom'

import RequireAuth from './HOC/RequireAuth'
import Home from './Home'
import PollPage from '../containers/PollPage'
import NewPoll from '../containers/NewPoll'
import ProfilePage from '../containers/ProfilePage'

export default (
  <Switch>
    <Route exact path='/polls/new' component={RequireAuth(NewPoll)} />
    <Route exact path='/polls/:id' component={PollPage} />
    <Route exact path='/me' component={RequireAuth(ProfilePage)} />
    <Route exact path='/' component={Home} />
  </Switch>
)
