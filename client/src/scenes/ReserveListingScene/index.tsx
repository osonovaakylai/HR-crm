import * as React from 'react'
import ReserveListingView from '../../components/hr/reserve-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class ReserveListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Reserve'
  }

  render() {
    return (
      <RestrictedScene component={ReserveListingView}
                       history={this.props.history}
        requiredPermissions={[PERMISSION_TYPES.manageReserveView]}
      />
    )
  }
}
