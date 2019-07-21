import * as React from 'react'
import CandidatesProfileView from '../../components/hr/candidates-profile-view'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class CandidatesProfileScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Candidates Profile'
  }

  render() {
    return (
      <RestrictedScene component={CandidatesProfileView}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.manageCandidatesProfileView]}
      />
    )
  }
}
