import * as React from 'react'
import {
  Route,
  Router,
  Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import PrivateRoute from './routes/PrivateRoute/index'
import {LoginScene} from './scenes/LoginScene/index'
import {RegisterScene} from './scenes/RegisterScene/index'
import {PositionsListingScene} from './scenes/PositionListingScene'
import {ProposalsListingScene} from './scenes/ProposalsListingScene'
import {VacanciesListingScene} from './scenes/VacanciesListingScene'
import {InterviewListingScene} from './scenes/InterviewListingScene'
import {InternsListingScene} from './scenes/InternsListingScene'
import {ReserveListingScene} from './scenes/ReserveListingScene'
import {ArchiveListingScene} from './scenes/ArchiveListingScene'
import {CandidatesListingScene} from './scenes/CandidatesListingScene'
import {CandidatesProfileScene} from './scenes/CandidatesProfileScene'
import {CandidatesInterviewInviteScene} from './scenes/CandidatesInterviewInviteScene'
import {MessageScene} from './scenes/MessageScene'
import {StatisticsScene} from './scenes/StatisticsScene'
import 'whatwg-fetch'
import AlertHeaderView from './components/alert-header-view/index'
import {PositionsFormScene} from './scenes/PositionsFormScene'
import {VacanciesFormScene} from './scenes/VacanciesFormScene'
import {InterviewFormScene} from './scenes/InterviewFormScene'
import './styles/style.scss'

import {AuthService} from './services'
import {instanceRegistry} from './common/annotations/common'
import {observable} from "mobx";
import {CurrentUser} from "./models/user";
import {observer} from "mobx-react";

const history = createBrowserHistory()

@observer
export default class App extends React.Component<{}, {}> {

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private currentUser?: CurrentUser

  constructor(props: {}, context?: any) {
    super(props, context)
    console.info('react started render')
  }

  render() {
    return (
      <Router history={history}>
        {this.authService.isLoggedIn ?
          <div>
            <AlertHeaderView history={history}/>
            <div className="animated-view route-container" id='route-container'>
              {this.renderRoutes()}
            </div>
          </div> :
          this.renderRoutes()
        }
      </Router>
    )
  }

  renderRoutes = () => (<Switch>
      <PrivateRoute path="/" exact component={ProposalsListingScene}/>
      <PrivateRoute exact path="/positions" component={PositionsListingScene}/>
      <PrivateRoute exact path="/positions/:id" component={PositionsFormScene}/>
      <PrivateRoute exact path="/positions/create" component={PositionsFormScene}/>
      <PrivateRoute exact path="/proposals" component={ProposalsListingScene}/>
      <PrivateRoute exact path="/interviews" component={InterviewListingScene}/>
      <PrivateRoute exact path="/interviews/:id" component={InterviewFormScene}/>
      <PrivateRoute exact path="/interviews/create" component={InterviewFormScene}/>
      <PrivateRoute exact path="/interns" component={InternsListingScene}/>
      <PrivateRoute exact path="/reserve" component={ReserveListingScene}/>
      <PrivateRoute exact path="/archive" component={ArchiveListingScene}/>
      <PrivateRoute exact path="/candidates" component={CandidatesListingScene}/>
      <PrivateRoute exact path="/candidates/create" component={CandidatesProfileScene}/>
      <PrivateRoute exact path="/candidates/:id" component={CandidatesProfileScene}/>
      <PrivateRoute exact path="/candidates/:id/invite" component={CandidatesInterviewInviteScene}/>
      <PrivateRoute exact path="/vacancies" component={VacanciesListingScene}/>
      <PrivateRoute exact path="/vacancies/create" component={VacanciesFormScene}/>
      <PrivateRoute exact path="/vacancies/:id" component={VacanciesFormScene}/>
      <PrivateRoute exact path="/message" component={MessageScene}/>
      <PrivateRoute exact path="/statistics" component={StatisticsScene}/>
      <Route path="/login" component={LoginScene}/>
      <Route path="/register" component={RegisterScene}/>
    </Switch>
  )
}

