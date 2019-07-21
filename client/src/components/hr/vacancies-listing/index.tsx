import * as React from 'react'
import {observer} from 'mobx-react'
import {instanceRegistry} from '../../../common/annotations/common'
import {
  VacanciesMapper
} from '../../../mappers'

import {
  VacanciesService
} from '../../../services'
import {VacanciesRequest} from '../../../models/vacancies'
import DateFormatter from '../../date-format'
import {observable, runInAction} from "mobx";
import PositionRequestModel from "../../../models/position";
import VacanciesModel from "../../../models/vacancies";

interface Props {
  history: any
}

@observer
export default class VacanciesListingView extends React.Component<Props, {}> {

  private vacanciesService: VacanciesService = instanceRegistry.get('VacanciesService')
  private vacanciesMapper: VacanciesMapper = instanceRegistry.get('VacanciesMapper')

  componentWillMount() {
    document.title = 'Vacancy'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  @observable
  private docs: any

  @observable
  private hasDocs: boolean = false

  async componentDidMount() {
    await this.initLoad()
    this.showWithAnimation()
    this.removeLoader()

    runInAction(() => {
      this.hasDocs = this.docs && this.docs.length
    })
  }

  async initLoad() {
    await this.vacanciesService.list()
    runInAction(() => {
      this.docs = this.vacanciesMapper.list
    })
  }

  showWithAnimation = () => {
    const base = document.getElementById('base-view')
    if (base) {
      base.classList.add('animated-view')
    }
  }

  removeLoader = () => {
    const ele = document.getElementById('loader')
    if (ele && ele.classList.contains('load')) {
      ele.classList.remove('load')
    }
  }

  render() {

    return (
      <div id="base-view">
        <section className="listing-title">
          <p className="size36 semibold">Vacancies</p>
          <p className="size36 semibold mob">Vacancies</p>
          {/*{this.isAllowedToEdit() && <a className="button black-line" onClick={() => this.redirectToInvitePage()}>Invite</a>}*/}
        </section>
        <section className="listing-dropdown">
          {/*area for dropdown*/}
        </section>
        {this.hasDocs ?
          <section className="listing-content ga">
            <ul className="listing">
              <li className="head">
                <p className="size14 bold">Vacancy</p>
                <p className="size14 bold">Job type</p>
                <p className="size14 bold">Creation date </p>
                <p className="size14 bold">Status</p>
              </li>
            </ul>
            <ul className="listing">
              {this.docs.map((res: VacanciesRequest.VacanciesListingModel) =>
                <li className="user" key={res._id} onClick={() => this.redirectToVacPage(res)}>
                  <p className="size14 medium">{res.vacancyName}</p>
                  <p className="size14 medium">{res.schedule}</p>
                  <p className="size14 medium">{<DateFormatter date={res.date}/>}</p>
                  <p className="size14 medium">{res.status}</p>
                </li>
              )}
            </ul>
          </section>
          :
          <p className='no-data'>There is no vacancies yet.</p>
        }
      </div>
    )
  }

  redirectToVacPage(vac: VacanciesRequest.VacanciesListingModel) {
    this.props.history.push(`/vacancies/${vac._id}`)
  }
}
