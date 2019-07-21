import * as React from 'react'
import {instanceRegistry} from '../../common/annotations/common'
import {AuthService} from '../../services/index'
import {Redirect, Route} from 'react-router'

interface Props {
  path: string
  component: any
  exact?: any
  location?: any
  computedMatch ?: any
}

const PrivateRoute = (props: Props) => {

  const authService: AuthService = instanceRegistry.get('AuthService')

  const isLoggedIn = authService.isLogged()


  // note to self -> should refactor to destructuring.
  // there are some problems with types. fix them and use destructuring
  const Component = props.component
  const path = isLoggedIn ? props.path : props.location.pathname
  const match = props.computedMatch
  const exact = props.exact
  return (
    <Route
      path={path}
      exact={exact}
      render={props => isLoggedIn ?
        (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {nextPath: path, match: match}
          }}/>
        )}
    />
  )
}

export default PrivateRoute
