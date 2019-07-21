import * as React from 'react'
import InternsListingView from '../../components/hr/interns-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class InternsListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Proposals'
  }

  render() {
    return (
      <RestrictedScene component={InternsListingView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageInternsView]}
      />
    )
  }
}
