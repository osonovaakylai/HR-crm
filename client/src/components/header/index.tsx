import * as React from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import {
  AuthService,
} from '../../services'

const MobileDetect: any = require('mobile-detect')
import {instanceRegistry} from '../../common/annotations/common'

interface Props {
  history: any
}

@observer
export default class HeaderWithAlerts extends React.Component<Props, {}> {

  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private menuShown: boolean

  componentDidMount() {

  }

  render() {
    const {history} = this.props

    return (
      <div className="page-header">
        <div className={`burger-area ${this.menuShown && 'open'}`} onClick={this.toggleMenu}>
          <img className="burger-opened" src={require('../../img/burger.svg')} alt="burger-opened"/>
          <img className="burger-closed" src={require('../../img/burger-close.svg')} alt="burger-closed"/>
        </div>

        {/*<div className="bell-container">*/}
        {/*  <div className="bell" id="showNotification">*/}
        {/*    <img src={require('../../img/alert.png')}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {this.renderMenu()}

      </div>
    )
  }

  private renderMenu = () => {

    return (
      <section className={`nav-menu ${this.menuShown && 'open'}`}>

        <div className="header">
          <span className="header-logo">
            <img src={require('../../img/logo-light.png')} alt="logo"/>
          </span>
          <span className="header-title">
            Hire IT
          </span>
          <span className="header-user">
            {/*<img src={require('../../img/avatar.jpg')} alt="logo"/>*/}
            {/*<span className="header-username">Akylai Osonova</span>*/}
          </span>
        </div>

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageCreatePositionView]) &&
        <Link to='/positions/create' className={`nav-link cursor-default`} onClick={this.toggleMenu}>
          <div className="add-button">
            <img className="normal" src={require("../../img/plus-dark.png")} alt="img"/>
            <img className="hover" src="../../img/plus-dark.png" alt="img"/>
            <p className="size15">Position</p>
          </div>
        </Link>}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageVacancyFormView]) &&
        <Link to='/vacancies/create' className={`nav-link cursor-default`} onClick={this.toggleMenu}>
          <div className="add-button">
            <img className="normal" src={require("../../img/plus-dark.png")} alt="img"/>
            <img className="hover" src="../../img/plus-dark.png" alt="img"/>
            <p className="size15">Vacancy</p>
          </div>
        </Link>}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageCandidatesView]) &&
        <Link to='/candidates/create' className={`nav-link cursor-default`} onClick={this.toggleMenu}>
          <div className="add-button add-button-small">
            <img className="normal" src={require("../../img/plus-dark.png")} alt="img"/>
            <img className="hover" src="../../img/plus-dark.png" alt="img"/>
            <p className="size15">Candidate</p>
          </div>
        </Link>}

        {this.authService.isAllowedTo([PERMISSION_TYPES.managePositionsView]) &&
        this.renderMenuItem('/positions', 'Positions',
          require("../../img/position-light.png"),
          require("../../img/position-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageProposalsView]) &&
        this.renderMenuItem('/proposals', 'Proposals',
          require("../../img/message-light.png"),
          require("../../img/message-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageVacanciesView]) &&
        this.renderMenuItem('/vacancies', 'Vacancies',
          require("../../img/vacancy-light-2.png"),
          require("../../img/vacancy-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageCandidatesView]) &&
        this.renderMenuItem('/candidates', 'Candidates',
          require("../../img/candidate-light.png"),
          require("../../img/candidate-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageReserveView]) &&
        this.renderMenuItem('/reserve', 'Reserve',
          require("../../img/reserve-light.png"),
          require("../../img/reserve-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageInternsView]) &&
        this.renderMenuItem('/interns', 'Interns',
          require("../../img/intern-light.png"),
          require("../../img/intern-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageReserveView]) &&
        this.renderMenuItem('/archive', 'Archive',
          require("../../img/reserve-light.png"),
          require("../../img/reserve-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageInterviewsView]) &&
        this.renderMenuItem('/interviews', 'Interviews',
          require("../../img/interview-light.png"),
          require("../../img/interview-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageSendMessageView]) &&
        this.renderMenuItem('/message', 'Send message',
          require("../../img/send-light.png"),
          require("../../img/send-yellow.png"))}

        {this.authService.isAllowedTo([PERMISSION_TYPES.manageStatisticsView]) &&
        this.renderMenuItem('/statistics', 'Statistics',
          require("../../img/statistics-light.png"),
          require("../../img/statistics-yellow.png"))}

        <div className="nav-link cursor-pointer logout" onClick={this.logout}>
          <img className="normal" src={require("../../img/logout-light.png")} alt="img"/>
          <img className="hover" src={require("../../img/logout-yellow.png")} alt="img"/>
          <p className="size15">Log out</p>
        </div>

      </section>
    )
  }

  renderMenuItem = (to: string, title: string, normalImg: any, hoverImg: any) => {
    return <Link to={to} className={`nav-link`} onClick={this.toggleMenu}>
      <img className="normal" src={normalImg} alt="img"/>
      <img className="hover" src={hoverImg} alt="img"/>
      <p className="size15">{title}</p>
    </Link>
  }

  private toggleMenu = action(() => {
    this.menuShown = !this.menuShown
    if (this.isMobileUserAgent()) {
      const routeContainer = document.getElementById('route-container')
      if (routeContainer && this.menuShown && !routeContainer.classList.contains('hidden')) {
        routeContainer.classList.add('hidden')
      }
      if (routeContainer && !this.menuShown && routeContainer.classList.contains('hidden')) {
        routeContainer.classList.remove('hidden')
      }
    }

  })

  private isMobileUserAgent = () => {
    console.log('mobile ')
    const md = new MobileDetect(window.navigator.userAgent)
    return md.mobile() || md.phone() || md.tablet()
  }

  private logout = action(async () => {
    this.toggleMenu()
    await this.authService.logout()
    this.props.history.push('/login')
    runInAction(() => this.authService.isLoggedIn = false)
  })

}
