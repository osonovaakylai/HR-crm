import * as React from 'react'
import VacanciesListingView from '../../components/hr/vacancies-listing'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class VacanciesListingScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Vacancies'
  }

  render() {
    return (
      <RestrictedScene component={VacanciesListingView}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageVacanciesView]}
      />
    )
  }
}
