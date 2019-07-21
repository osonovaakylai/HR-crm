import * as React from 'react'
import {observer} from 'mobx-react'
import {instanceRegistry} from '../../../common/annotations/common'
import InterviewModel from '../../../models/interview'
import TruncateText from '../../truncate-text'
import {DATE_TIME_FORMAT} from '../../../dicts/constants'
import moment = require('moment')
import DateFormatter from '../../date-format'
import {
  InterviewMapper
} from '../../../mappers'

import {
  AuthService,
  InterviewService
} from '../../../services'
import {action, observable, runInAction} from "mobx";
import {ROLES_AND_PERMISSIONS} from "../../../dicts/roles-and-permissions";
import {Link} from "react-router-dom";
import AlertPopup from "../../alert-popup/alert-popup";

interface Props {
  history: any
}

@observer
export default class InterviewListingView extends React.Component<Props, {}> {
  private interviewService: InterviewService = instanceRegistry.get('InterviewService')
  private interviewMapper: InterviewMapper = instanceRegistry.get('InterviewMapper')

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private docs: any

  @observable
  private hasDocs: boolean = false

  @observable
  private interviewId: any

  @observable
  private showDeleteError: boolean = false

  componentWillMount() {
    document.title = 'Interview'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    await this.initLoad()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    await this.interviewService.list()
    runInAction(() => this.docs = this.interviewMapper.list)
    if (this.docs && this.docs.length) {
      runInAction(() => this.hasDocs = true)
    } else {
      runInAction(() => this.hasDocs = false)
    }
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
          <p className="size36 semibold">Interview</p>
          <p className="size36 semibold mob">Interview</p>
          {this.isAllowedToEdit() &&
          <Link to='/interviews/create' className={`plus`}>
            <img className="normal" src={require("../../../img/plus-dark.png")} alt="img"/>
          </Link>
          }
        </section>
        {this.hasDocs ?
          <section className="listing-content ga">
            <ul className="listing">
              <li className="head">
                <p className="size14 bold">Email</p>
                <p className="size14 bold">Position</p>
                <p className="size14 bold">Date</p>
                <p className="size14 bold">Interviewers</p>
                {this.isAllowedToEdit() && <p className="size14 bold">Action</p>}
              </li>
            </ul>
            <ul className="listing">
              {this.docs.map((item: InterviewModel) =>
                <li className="user no-hover" key={item._id}>
                  <p className="size14 medium"> {item.email.email} </p>
                  <p className="size14 medium"> {item.vacancy.vacancyName} </p>
                  <p className="size14 medium"> {<DateFormatter date={item.date}/>}</p>
                  <div className="size14 medium line-break">{item.interviewer ?
                    <TruncateText
                      longText={item.interviewers.length ? item.interviewer.concat(', ', item.interviewers.join(', ')) : item.interviewer}
                      lines={2} isShowMore={true}/> : ' - '}
                  </div>
                  {this.isAllowedToEdit() &&
                  <p>
                    <span>
                      <a className={`button size14 semibold action-btn`} onClick={() => this.redirectToIndivPage(item)}>
                        Edit
                      </a>
                    </span>
                    <span>
                    <a className={`button size14 semibold action-btn`} style={{marginLeft: `135px`}}
                       onClick={() => this.showHidePopup(true, item._id)}
                    >
                      Delete
                    </a>
                      </span>
                  </p>
                  }
                </li>
              )}
            </ul>
          </section>
          :
          <p className='no-data'>There is no interviews yet.</p>
        }
        {this.showDeleteError &&
        <AlertPopup
          title={`Delete this interivew ?`}
          isSingleOption={false}
          actionClicked={() => this.deleteInterview()}
          actionTitle={'Yes, remove'}
          cancelTitle={'Cancel'}
          cancelClicked={() => this.showHidePopup(false)}
        />}
      </div>
    )
  }

  showHidePopup = action((show: boolean, id: any = '') => {
    this.showDeleteError = show
    runInAction(() => {
      this.interviewId = id
    })
  })

  deleteInterview = action(async () => {
    await this.interviewService.delete(this.interviewId)
    this.showHidePopup(false)
    setTimeout(() => {
      window.location.reload()
      window.scrollTo(0, 0)
    }, 1000)
  })


  isAllowedToEdit = () => {
    let user = this.authService.getCurrentUser()
    return (user.role === (ROLES_AND_PERMISSIONS.HR || ROLES_AND_PERMISSIONS.GLOBAL_ADMIN))
  }

  redirectToIndivPage(interview: InterviewModel) {
    this.props.history.push(`/interviews/${interview._id}`)
  }
}
