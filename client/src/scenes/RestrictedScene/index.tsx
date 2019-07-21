import * as React from 'react'
import {instanceRegistry} from '../../common/annotations/common'
import {AuthService} from '../../services/index'
import {Redirect} from 'react-router'
import {ROLES_AND_PERMISSIONS} from "../../dicts/roles-and-permissions";

interface Props {
  component: any
  history: any
  location?: any
  match?: any
  companyRequest?: any
  company?: any
  requiredPermissions: string[]
  // requiredPermissionsReserve?: string[]
}

const RestrictedScene = (props: Props) => {

  const authService: AuthService = instanceRegistry.get('AuthService')

  const user = authService.getCurrentUser()
  const permissions = user.permissions

  const Component = props.component

  const allowed = props.requiredPermissions.every(it => permissions.includes(it))

  // const allowedReserve = props.requiredPermissionsReserve ?
  //   props.requiredPermissionsReserve.every(it => permissions.includes(it)) : false


  if (allowed) {
    return <Component history={props.history}
                      location={props.location}
                      match={props.match}
                      company={props.company}
                      companyRequest={props.companyRequest}/>
  }
  return user.role === ROLES_AND_PERMISSIONS.HEAD_OF_DEPARTMENT ? <Redirect to="/positions"/> : <Redirect to="/"/>
}

export default RestrictedScene
