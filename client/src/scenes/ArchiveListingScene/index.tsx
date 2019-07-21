import * as React from 'react'
import ArchiveListingView from '../../components/hr/archive-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class ArchiveListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Archive'
  }

  render() {
    return (
      <RestrictedScene component={ArchiveListingView}
                       history={this.props.history}
        requiredPermissions={[PERMISSION_TYPES.manageReserveView]}
      />
    )
  }
}
