import * as React from 'react'
import PositionsListingView from '../../components/head-of-department/position-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class PositionsListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Positions'
  }

  render() {
    return (
      <RestrictedScene component={PositionsListingView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.managePositionsView]}
    />
    )
  }
}
