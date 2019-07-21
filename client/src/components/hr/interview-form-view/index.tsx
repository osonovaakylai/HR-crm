import * as React from 'react'
import {observer} from 'mobx-react'
import DefaultSelect from '../../default-select/default-select'
import interviewEditValidation from '../../../validation/interview-edit-validation'
import * as Datetime from 'react-datetime';
import RegistrationField from '../../registration-field/registration-field'

import {
  action,
  observable,
  runInAction
} from 'mobx'

import {instanceRegistry} from '../../../common/annotations/common'
import {
  InterviewMapper,
  CandidatesListMapper,
  VacanciesListMapper
} from '../../../mappers'

import {
  InterviewService,
  CandidatesListService,
  VacanciesListService
} from '../../../services'
import AlertPopup from "../../alert-popup/alert-popup";
import moment = require("moment");
import {DATE_TIME_FORMAT} from "../../../dicts/constants";

interface Props {
  history: any
  match: any
  state: any
}

@observer
export default class InterviewFormView extends React.Component<Props, {}> {

  private interviewService: InterviewService = instanceRegistry.get('InterviewService')
  private candidatesListService: CandidatesListService = instanceRegistry.get('CandidatesListService')
  private vacanciesListService: VacanciesListService = instanceRegistry.get('VacanciesListService')

  private interviewMapper: InterviewMapper = instanceRegistry.get('InterviewMapper')
  private candidatesListMapper: CandidatesListMapper = instanceRegistry.get('CandidatesListMapper')
  private vacanciesListMapper: VacanciesListMapper = instanceRegistry.get('VacanciesListMapper')
  private isNew: boolean = this.props.match.url === '/interviews/create'

  @observable
  private currentForm: any = {
    _id: null,
    email: null,
    vacancy: null,
    interviewer: '',
    interviewers: [],
  }

  @observable
  private chosenCandidate: any

  @observable
  private chosenVacancy: any

  @observable
  private interviewValidationForm: any

  @observable
  private arrayOfEntitiesInterviewer: any = []

  @observable
  private interviewersObj: any = {}

  @observable
  private interviewer: string

  @observable
  private interviewerCounter: number = 1

  @observable
  private allVacancies: any = []

  @observable
  private allCandidates: any = []

  @observable
  private showDeleteError: boolean = false

  @observable
  private isSelectCandidateActive: boolean = true

  constructor(props: any) {
    super(props)
    this.interviewValidationForm = interviewEditValidation()
  }

  componentWillMount() {
    document.title = 'Interview form'
    this.addLoader()
  }

  async componentDidMount() {
    this.isNew ? await this.initLoad() : await this.initLoadDoc(this.props.match.params.id)
    this.initCategoriesAndOptions()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    await this.interviewService.list()
    await this.candidatesListService.list()
    await this.vacanciesListService.list()
  }

  async initCategoriesAndOptions() {
    runInAction(() => {
      this.allCandidates = this.candidatesListMapper.list
      this.allVacancies = this.vacanciesListMapper.list
    })
    if (this.props.history.location.state) {
      this.allCandidates.forEach((type: any) => {
        if (type._id === this.props.history.location.state.candidateId)
          runInAction(() => {
            this.chosenCandidate = type ? {
              value: type,
              label: type.email
            } : null
            this.currentForm.email = type._id

            this.isSelectCandidateActive = false
          })
      })
    }
  }

  async initLoadDoc(interviewId: any) {
    this.candidatesListService.list()
    this.vacanciesListService.list()
    await this.interviewService.getById(interviewId)
    const interview = this.interviewMapper.interview
    this.fillInterviewers(interview.interviewers)
    runInAction(() => {
      this.currentForm = interview && ({
        _id: interview!._id,
        email: interview!.email ? interview!.email._id : null,
        date: interview!.date,
        vacancy: interview!.vacancy ? interview!.vacancy._id : null,
        interviewer: interview!.interviewer
      })

      this.chosenCandidate = interview!.email ? {
        value: interview!.email,
        label: interview!.email.email
      } : null

      this.chosenVacancy = interview!.vacancy ? {
        value: interview!.vacancy,
        label: interview!.vacancy.vacancyName
      } : null
    })
  }

  fillInterviewers = (item: any) => {
    let counter = 1
    runInAction(() => {
      this.currentForm.interviewers = item
    })

    this.currentForm.interviewers.forEach((item: any) => {
      counter++
      const interviewer = 'interviewers' + counter
      this.interviewersObj[interviewer] = item
      this.addNewInterviewer()
    })
  }

  removeAnimation = () => {
    const base = document.getElementById('base-view')
    if (base && base.classList.contains('animated-view')) {
      base.classList.remove('animated-view')
    }
  }

  addLoader = () => {
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
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

  async componentWillReceiveProps(newProps: any) {
    this.addLoader()
    this.removeAnimation()
    if (newProps.match.url === '/interviews/create') {
      this.isNew = true;
    }
    this.isNew ? this.refreshNew() : await this.initLoadDoc(newProps.match.params.id)
    this.showWithAnimation()
    this.removeLoader()
  }

  @action
  refreshNew() {
    this.currentForm = {
      _id: null,
      email: null,
      vacancy: null,
      interviewer: '',
      interviewers: [],
    }
  }

  render() {
    return (
      <div id="base-view">
        <div className="back-to-desktop" onClick={this.toInterviwersListing}>
          <img src="../../../img/back-arrow.svg" alt="back"/>
          <p className="lh19 size16 bold">Back to Interviews</p>
        </div>
        <form className={`purchase-order `} action="#">

          <div className="step open">

            <section className={`input-section ${this.isSelectCandidateActive ? '' : 'disabled'}`}>
              <p className="size16 input-name ">Candidate's email</p>

              <DefaultSelect
                form={this.interviewValidationForm}
                field={'email'}
                placeholder=''
                value={this.chosenCandidate}
                clearable={false}
                onChange={(type) => this.candidateTypeChanged(type)}
                boldInput={true}
                disabled={!this.isNew}
                options={this.allCandidates.map((type: any) => {
                  return {
                    value: type,
                    label: type.email
                  }
                })}
              />
            </section>

            <section className="input-section">
              <p className={`size16 input-name`}>Datetime</p>
              <Datetime
                value={this.isNew ? '' : moment(this.currentForm.date).format(DATE_TIME_FORMAT)}
                onChange={this.dateTimeChange}
              />
            </section>

            <section className="input-section">
              <p className="size16 input-name ">Vacancy</p>

              <DefaultSelect
                form={this.interviewValidationForm}
                field={'vacancy'}
                placeholder=''
                value={this.chosenVacancy}
                clearable={false}
                onChange={(type) => this.vacancyTypeChanged(type)}
                boldInput={true}
                options={this.allVacancies.map((type: any) => {
                  return {
                    value: type,
                    label: type.vacancyName
                  }
                })}
              />
            </section>


            <RegistrationField
              form={this.interviewValidationForm}
              onChange={this.textChangeHandlerFor('interviewer')}
              field={'interviewer'}
              title={'Interviewers'}
              value={this.currentForm.interviewer}
              required={true}
            />

            {this.arrayOfEntitiesInterviewer.map((interviewer: any) =>
              <li key={interviewer.interviewerName}>
                <section className="input-section">
                  <p
                    className="size16 input-name">{interviewer.fieldTitle + (this.arrayOfEntitiesInterviewer.indexOf(interviewer) + 2)}</p>
                  <input
                    type="text"
                    defaultValue={this.interviewersObj[interviewer.interviewerName]}
                    onChange={(event) => this.arrayChangeHandlerFor(event, interviewer.interviewerName)}/>
                  <p className="size14 invalid">This is a required field</p>
                </section>
                <div className="input-clear"
                     onClick={() => this.removeInterviewer(this.arrayOfEntitiesInterviewer.indexOf(interviewer), interviewer.interviewerName)}></div>
              </li>
            )}

            <p className="add-click" onClick={() => this.addNewInterviewer()}>+ Add Interviewer</p>

          </div>
        </form>

        <div className="step-buttons-check">
          {!this.isNew &&
          <a className={`button`}
             style={{width: `190px`}}
             onClick={() => this.redirectToCandidatesProfile(this.currentForm.email)}
          >
            Candidate's profile
          </a>}
          {!this.isNew &&
          <a className={`button`}
             onClick={() => this.showHidePopup(true)}
          >
            Delete
          </a>}

          <a className={`button`}
             onClick={() => this.createInterview()}
          >
            Save
          </a>

        </div>
        {this.showDeleteError &&
        <AlertPopup
          title={`Delete interview with ${this.currentForm.email.email} ?`}
          isSingleOption={false}
          actionClicked={() => this.deleteInterview()}
          actionTitle={'Yes, remove'}
          cancelTitle={'Cancel'}
          cancelClicked={() => this.showHidePopup(false)}
        />}
      </div>
    )
  }

  arrayChangeHandlerFor(event: any, interviewerName: string) {

    this.interviewersObj[interviewerName] = event.target.value || null
  }

  @action
  addNewInterviewer() {
    this.interviewerCounter++
    let interviewer = {
      field: 'interviewers',
      interviewerName: 'interviewers' + this.interviewerCounter,
      fieldTitle: 'Interviewer '
    }
    this.arrayOfEntitiesInterviewer.push(interviewer)
  }

  @action
  removeInterviewer(index: any, interviewerName: string) {
    this.arrayOfEntitiesInterviewer.splice(index, 1)
    delete  this.interviewersObj[interviewerName]
  }

  toInterviwersListing = () => {
    this.props.history.push(`/interviews`)
  }


  @action
  vacancyTypeChanged(type: any) {
    this.chosenVacancy = type ? type : null
    this.currentForm.vacancy = type ? type.value._id : null
  }

  @action
  candidateTypeChanged(type: any) {
    this.chosenCandidate = type ? type : null
    this.currentForm.email = type ? type.value._id : null
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    this.currentForm[fieldName] = event.target.value || null

  })

  dateTimeChange = (time: any) => {
    runInAction(() => {
      this.currentForm.date = time

    })
  }

  async createInterview() {
    this.interviewValidationForm.update(this.currentForm)
    const isValid = await this.checkFields()
    if (!isValid) {
      return
    }


    if (this.arrayOfEntitiesInterviewer.length) {
      this.currentForm.interviewers = []
      for (let key in this.interviewersObj) {
        this.currentForm.interviewers.push(this.interviewersObj[key])
      }
    }

    const promise = this.isNew ? this.interviewService.createInterview(this.currentForm) : this.interviewService.update(this.props.match.params.id, this.currentForm)
    promise.then(() => {
      setTimeout(() => {
        window.location.reload()
        window.scrollTo(0, 0)
      }, 1000)
    })
      .catch(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    return true
  }

  showHidePopup = action((show: boolean) => {
    this.showDeleteError = show
  })

  deleteInterview = action(async () => {
    this.showHidePopup(false)
    await this.interviewService.delete(this.currentForm._id)
  })

  async checkFields(): Promise<boolean> {
    const forms = [
      this.interviewValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return false
    }

    return true
  }

  private redirectToCandidatesProfile = (id: any) => {
    this.props.history.push(`/candidates/${id}`)
  }
}
