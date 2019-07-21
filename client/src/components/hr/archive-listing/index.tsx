import * as React from 'react'
import {observer} from 'mobx-react'

import {
  CandidatesMapper,
} from '../../../mappers'

import {
  CandidatesService,
} from '../../../services'
import {instanceRegistry} from '../../../common/annotations/common'
import DateFormatter from '../../date-format'
import {CandidatesRequest} from "../../../models/candidates";
import {observable, runInAction} from "mobx";

interface Props {
  history: any
}

@observer
export default class ArchiveListingView extends React.Component<Props, {}> {

  private candidatesService: CandidatesService = instanceRegistry.get('CandidatesService')
  private candidatesMapper: CandidatesMapper = instanceRegistry.get('CandidatesMapper')

  @observable
  private docs: any

  @observable
  private hasDocs: boolean = false

  componentWillMount() {
    document.title = 'Reserve'
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
        value: 'hired'
      }
    }
    await this.candidatesService.list(defaultQueryParams)
    runInAction(() => {
      this.docs = this.candidatesMapper.list
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
          <p className="size36 semibold">Archive</p>
          <p className="size36 semibold mob">Archieve</p>
        </section>

        {this.hasDocs ?
        <section className="listing-content ga">
          <ul className="listing">
            <li className="head">
              <p className="size14 bold">Fullname</p>
              <p className="size14 bold">Department</p>
              <p className="size14 bold">Date</p>
              <p className="size14 bold">Email</p>
              <p className="size14 bold">Comment</p>
              <p className="size14 bold">Status</p>
            </li>
          </ul>
          <ul className="listing">
            {this.docs.map((res: CandidatesRequest.CandidatesListingModel) =>
            <li className="user" key={res._id} onClick={() => this.redirectToCandidatesPage(res)}>
              <p className="size14 medium">{res.firstname}  {res.lastname}</p>
              <p className="size14 medium">{res.department.name? res.department.name : '-'}</p>
              <p className="size14 medium">{<DateFormatter date={res.date}/>}</p>
              <p className="size14 medium">{res.email}</p>
              <p className="size14 medium">{res.comment}</p>
              <p className="size14 medium yellow semibold">{res.status.name}</p>
            </li>
              )}
          </ul>
        </section>
          :
          <p className='no-data'>There is no hired employees yet.</p>
        }
      </div>
    )
  }

  redirectToCandidatesPage(res: CandidatesRequest.CandidatesListingModel) {
    this.props.history.push(`/candidates/${res._id}`)
  }
}
