import * as React from 'react'
import InterviewFormView from '../../components/hr/interview-form-view'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class InterviewFormScene extends React.Component<Props, {}> {
  render() {
    return (
      <RestrictedScene component={InterviewFormView}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.manageInterviewFormView]}/>
    )
  }
}
