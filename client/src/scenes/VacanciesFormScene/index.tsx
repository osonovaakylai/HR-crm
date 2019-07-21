import * as React from 'react'
import RestrictedScene from '../RestrictedScene/index'
import VacancyCreateView from '../../components/hr/vacancy-form-view'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class VacanciesFormScene extends React.Component<Props, {}> {
  render() {
    return (
      <RestrictedScene component={VacancyCreateView}
                       history={this.props.history}
                       match={this.props.match}
                       requiredPermissions={[PERMISSION_TYPES.manageVacancyFormView]}/>
    )
  }
}
