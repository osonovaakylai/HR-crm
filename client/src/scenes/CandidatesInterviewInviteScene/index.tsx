import * as React from 'react'
import CandidatesInterviewInviteForm from '../../components/hr/candidates-interview-invite-form'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class CandidatesInterviewInviteScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Candidates'
  }

  render() {
    return (
      <RestrictedScene component={CandidatesInterviewInviteForm}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.manageInterviewFormView]}
      />
    )
  }
}
