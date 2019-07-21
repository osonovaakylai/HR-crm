import * as React from 'react'
import {observer} from 'mobx-react'
import {instanceRegistry} from '../../../common/annotations/common'
import {ProposalMapper} from '../../../mappers'

import {
  AuthService,
  ProposalService,
  VacanciesService
} from '../../../services'
import ProposalModel from '../../../models/proposal'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import DateFormatter from '../../date-format'
import Select from 'react-select'

interface Props {
  history: any
}

const OPTIONS = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'reviewed',
    label: 'Reviewed'
  },
  {
    value: 'closed',
    label: 'Closed'
  },
  {
    value: 'all',
    label: 'All statuses'
  }
]

@observer
export default class ProposalListingView extends React.Component<Props, {}> {

  private vacanciesService: VacanciesService = instanceRegistry.get('VacanciesService')

  private proposalService: ProposalService = instanceRegistry.get('ProposalService')
  private proposalMapper: ProposalMapper = instanceRegistry.get('ProposalMapper')

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private docs: any

  @observable
  private queryParams: {
    status: {
      label: string,
      value: string
    }
  } = {
    status: {
      label: 'All statuses',
      value: 'all'
    }
  }

  @observable
  private hasDocs: boolean = false

  @observable
  private isMobile: boolean = window.innerWidth <= 719

  componentWillMount() {
    document.title = 'Proposals'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    await this.initLoad()
    this.showWithAnimation()
    this.removeLoader()
    runInAction(() => {
      this.hasDocs = this.docs && this.docs.length
    })
  }

  async initLoad() {
    const defaultQueryParams = {
      status: {
        label: 'All Statuses',
        value: 'all'
      }
    }
    await this.proposalService.list(defaultQueryParams)
    runInAction(() => {
      this.docs = this.proposalMapper.list
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

    const docs = this.docs
    return (
      <div id="base-view">
        <section className="listing-title">
          <p className="size36 semibold">Proposals</p>
          <p className="size36 semibold mob">Proposals</p>
        </section>
        <section className="listing-dropdown">
        </section>

        <section className='select-section'>
          <Select
            className='select-doc-query'
            name=""
            placeholder="Select status"
            value={this.queryParams.status}
            searchable={true}
            clearable={false}
            onChange={this.onFieldChanged('status')}
            options={OPTIONS}
          />
        </section>

        {this.isMobile && this.hasDocs &&
        <section className="listing-content ga">
          <ul className="listing">
            <li className="head">
              <p className="size14 bold">Position</p>
              <p className="size14 bold">Status</p>
              <p className="size14 bold">Action</p>
            </li>
          </ul>
          <ul className="listing">
            {docs.map((prop: ProposalModel) =>
              <li className="user no-hover" key={prop._id}>
                <p className="size14 medium">{prop.position.name}</p>
                <p className="size14 medium yellow">{prop.status}</p>
                <p className={prop.status === 'reviewed' || prop.status === 'closed' ? 'disabled disabled-btn' : ''}>
                  <a className={`button size14 semibold`}
                     onClick={() => this.createVacancy(prop._id)}
                  >
                    Create vacancy
                  </a>
                </p>
              </li>
            )}
          </ul>
        </section>
        }
        {!this.isMobile && this.hasDocs &&
        <section className="listing-content ga">
          <ul className="listing">
            <li className="head">
              <p className="size14 bold">Creator's email</p>
              <p className="size14 bold">Position</p>
              <p className="size14 bold">Date</p>
              <p className="size14 bold">Amount</p>
              <p className="size14 bold">Status</p>
              <p className="size14 bold">Action</p>
            </li>
          </ul>
          <ul className="listing">
            {docs.map((prop: ProposalModel) =>
              <li className="user no-hover" key={prop._id}>
                <p className="size14 medium">{prop.creator}</p>
                <p className="size14 medium">{prop.position.name}</p>
                <p className="size14 medium"><DateFormatter date={prop.date}/></p>
                <p className="size14 medium">{prop.amount}</p>
                <p className="size14 medium yellow">{prop.status}</p>
                <p className={prop.status === 'reviewed' || prop.status === 'closed' ? 'disabled disabled-btn' : ''}>
                  <a className={`button size14 semibold`}
                     onClick={() => this.createVacancy(prop._id)}
                  >
                    Create vacancy
                  </a>
                </p>
              </li>
            )}
          </ul>
        </section>
        }

        {!this.hasDocs &&
        <p className='no-data'>There is no proposals yet.</p>
        }
      </div>
    )
  }

  async createVacancy(proposalId: any) {
    const promise = this.vacanciesService.createVacancyFromProposal(proposalId)
    promise.then((vacancyId) => {
             setTimeout(() => {
             }, 1000)
             this.redirectToCreateVacancyPage(vacancyId)
           })
           .catch(() => {
             console.log('ERROR in creating position!!!')
           })
    return true
  }

  @action
  private onFieldChanged = (fieldName: string) => action((value: any) => {
    // @ts-ignore
    this.queryParams[fieldName] = value

    this.refreshList()
  })

  refreshList = async () => {
    await this.proposalService.list(this.queryParams)
    runInAction(() => {
      this.docs = this.proposalMapper.list
    })
  }

  redirectToCreateVacancyPage(id: any) {
    this.props.history.push(`/vacancies/${id}`)
  }
}
