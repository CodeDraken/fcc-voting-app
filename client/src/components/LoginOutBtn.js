import React from 'react'

export default ({ user, El = 'li' }) => (
  user.githubId
    ? <El><a href='/auth/logout'>Logout</a></El>
    : <El><a href='/auth/github'>Login with GitHub</a></El>
)
