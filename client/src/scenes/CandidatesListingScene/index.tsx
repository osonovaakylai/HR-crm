import * as React from 'react'
import CandidatesListingView from '../../components/hr/candidates-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class CandidatesListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Candidates'
  }

  render() {
    return (
      <RestrictedScene component={CandidatesListingView}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.manageCandidatesView]}
      />
    )
  }
}
