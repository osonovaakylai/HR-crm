import * as React from 'react'
import ProposalListingView from '../../components/hr/proposal-listing'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'
import RestrictedScene from '../RestrictedScene/index'

interface Props {
  history: History
  location: any
  match: any
}

export class ProposalsListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Proposals'
  }

  render() {
    return (
      <RestrictedScene component={ProposalListingView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageProposalsView]}/>
    )
  }
}
