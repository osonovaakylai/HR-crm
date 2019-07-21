import * as React from 'react'
import {observer} from 'mobx-react'
import interviewInviteValidation from '../../../validation/interview-invite-validation'
import DefaultTextarea from '../../default-textarea/default-textarea'
import RegistrationField from '../../registration-field/registration-field'
import * as Datetime from 'react-datetime';
import {
  CandidateInviteService
} from '../../../services'

import {
  action,
  observable,
  runInAction
} from 'mobx'

import {instanceRegistry} from '../../../common/annotations/common'

interface Props {
  history: any
  match: any
}

@observer
export default class CandidatesInterviewInviteForm extends React.Component<Props, {}> {

  private candidateInviteService: CandidateInviteService = instanceRegistry.get('CandidateInviteService')

  @observable
  private interviewInviteValidationForm: any

  @observable
  private showSuccess: boolean = false

  @observable
  private showFailure: boolean = false

  constructor(props: any) {
    super(props)
    this.interviewInviteValidationForm = interviewInviteValidation()
  }

  @observable
  private currentForm: any = {
    fullname: '',
    place: '',
    message: '',
    datetime: null
  }

  componentWillMount() {
    document.title = 'Invite to interview'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    await this.initLoad()
    this.initCategoriesAndOptions()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    // await this.userService.list(false)
  }

  async initCategoriesAndOptions() {

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
        <div className="back-to-desktop" onClick={this.toProfile}>
          <img src="../../img/back-arrow.svg" alt="back" />
          <p className="lh19 size16 bold">Back to Profile</p>
        </div>
          <p className="form-name size36 semibold ">Invite to interview</p>

        <form className={`purchase-order `} action="#">

          <div className="step open">

            <RegistrationField
              form={this.interviewInviteValidationForm}
              onChange={this.textChangeHandlerFor('fullname')}
              field={'fullname'}
              title={'Fullname'}
              value={this.currentForm.fullname}
              required={true}
            />

            <RegistrationField
              form={this.interviewInviteValidationForm}
              onChange={this.textChangeHandlerFor('place')}
              field={'place'}
              title={'Place'}
              value={this.currentForm.place}
              required={true}
            />

            <DefaultTextarea
              form={this.interviewInviteValidationForm}
              onChange={this.textChangeHandlerFor('message')}
              field={'message'}
              title={'Message'}
              value={this.currentForm.message}
              required={true}
            />

            <section className="input-section">
              <p className={`size16 input-name`}>Date and time</p>
              <Datetime
                onChange={this.dateTimeChange}
              />
            </section>
          </div>
        </form>

        <div className="step-buttons-check">
          <a className={`button`}
             id="invite"
            onClick={this.inviteCandidate}
          >
            Invite
          </a>
        </div>
      </div>
    )
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    this.currentForm[fieldName] = event.target.value || null
  })

  toProfile = () => {
    this.props.history.push(`/candidates/id`)
  }

  inviteCandidate = async () => {
    const forms = [
      this.interviewInviteValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return
    }
    const response = await this.candidateInviteService.doInvite(this.currentForm)
    response.ok ? this.showSuccessView() : this.showFailureView(response)
  }

  showSuccessView = action(() => {
    this.showSuccess = true
  })

  showFailureView = action((res: Response) => {
    this.showFailure = true
  })

  dateTimeChange = (time: any) => {
    runInAction(() => {
      this.currentForm.datetime = time

    })
  }
}