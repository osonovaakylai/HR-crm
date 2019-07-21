import * as React from 'react'
import InterviewListingView from '../../components/hr/interview-listing/index'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class InterviewListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Proposals'
  }

  render() {
    return (
      <RestrictedScene component={InterviewListingView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageInterviewsView]}
      />
    )
  }
}
