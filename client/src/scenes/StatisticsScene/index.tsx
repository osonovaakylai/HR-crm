import * as React from 'react'
// import headStatisticsView from '../../components/head-of-department/statistics'
import HrStatisticsView from '../../components/statistics'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'
import RestrictedScene from '../RestrictedScene'

interface Props {
  history: History
  location: any
  match: any
}

export class StatisticsScene extends React.Component<Props, {}> {

  componentWillMount() {
    document.title = 'Statistics'
  }

  render() {
    return (
      <RestrictedScene component={HrStatisticsView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageStatisticsView]}
      />
    )
  }
}
