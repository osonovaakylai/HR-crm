import * as React from 'react'
import PositionsFormView from '../../components/head-of-department/positions-form-view'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class PositionsFormScene extends React.Component<Props, {}> {
  render() {
    return (
      <RestrictedScene component={PositionsFormView}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.managePositionsView]}/>
    )
  }
}
