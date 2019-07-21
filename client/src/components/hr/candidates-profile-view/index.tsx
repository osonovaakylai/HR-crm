import * as React from 'react'
import {observer} from 'mobx-react'
import DefaultSelect from '../../default-select/default-select'
import candidatesProfileValidation from '../../../validation/candidates-profile-validation'
import RegistrationField from '../../registration-field/registration-field'
import AlertPopup from '../../alert-popup/alert-popup'
import {CurrentUser} from '../../../models/user'
import {CANDIDATE_STATUSES} from "../../../dicts/candidate";

import {
  action,
  observable,
  runInAction
} from 'mobx'

import {
  DocumentService,
  CandidatesService,
  DepartmentNamesService,
  LevelNamesService,
  CandidatesStatusService,
  AuthService
} from '../../../services'

import {
  CandidatesMapper,
  DepartmentNamesMapper,
  LevelNamesMapper,
  CandidatesStatusMapper
} from '../../../mappers/index'

import {instanceRegistry} from '../../../common/annotations/common'
import Pathes from "../../../dicts/pathes";

const Dropzone: any = require('react-dropzone').default
const ExifOrientationImg: any = require('react-exif-orientation-img').default

interface Props {
  history: any
  match: any
}

@observer
export default class CandidatesProfileView extends React.Component<Props, {}> {

  private documentService: DocumentService = instanceRegistry.get('DocumentService')
  private candidatesService: CandidatesService = instanceRegistry.get('CandidatesService')
  private departmentNamesService: DepartmentNamesService = instanceRegistry.get('DepartmentNamesService')
  private levelNamesService: LevelNamesService = instanceRegistry.get('LevelNamesService')
  private candidatesStatusService: CandidatesStatusService = instanceRegistry.get('CandidatesStatusService')

  private candidatesMapper: CandidatesMapper = instanceRegistry.get('CandidatesMapper')
  private departmentNamesMapper: DepartmentNamesMapper = instanceRegistry.get('DepartmentNamesMapper')
  private levelNamesMapper: LevelNamesMapper = instanceRegistry.get('LevelNamesMapper')
  private candidatesStatusMapper: CandidatesStatusMapper = instanceRegistry.get('CandidatesStatusMapper')

  private isNew: boolean = this.props.match.url === '/candidates/create'

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private currentForm: any = {
    _id: null,
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    skype: '',
    department: null,
    experience: '',
    level: null,
    status: null,
    comment: [],
    attachedCV: null,
  }

  @observable
  private title: string

  @observable
  private currentUser: CurrentUser

  @observable
  private isUploading: boolean = false

  @observable
  private selectedCV: File

  @observable
  private showConfirmationPopup: boolean

  @observable
  private showDeleteError: boolean = false

  @observable
  private chosenStatus: any

  @observable
  private chosenDepartment: any

  @observable
  private chosenLevel: any

  @observable
  private arrayOfEntitiesComment: any = []

  @observable
  private candidatesProfileValidationForm: any

  @observable
  private commentCounter: number = 1

  @observable
  private commentsObj: any = {}

  @observable
  private uploadProgress: string = 'Attach a file'

  @observable
  private showFormatErrorPopup: boolean

  @observable
  private showErrorPopup: boolean

  @observable
  private showFileName: boolean = true

  @observable
  private isHireCandidate: boolean = false

  @observable
  private showHideButtonHire: boolean = true

  @observable
  private showHideButtonSendMessage: boolean = true

  @observable
  private showHideButtonInterviewInvite: boolean = true

  @observable
  private preview: any

  @observable
  private allDepartments: any = []

  @observable
  private allLevels: any = []

  @observable
  private allStatuses: any = []

  constructor(props: any) {
    super(props)
    this.candidatesProfileValidationForm = candidatesProfileValidation()
  }

  componentWillMount() {
    document.title = 'Profile'
    this.addLoader()
  }

  async componentDidMount() {
    this.isNew ? await this.initLoad() : await this.initLoadDoc(this.props.match.params.id)
    this.initCategoriesAndOptions()
    this.showWithAnimation()
    this.removeLoader()
    runInAction(() => {
      this.currentUser = this.authService.getCurrentUser()
    })
  }

  async initLoad() {
    await this.departmentNamesService.list()
    await this.candidatesStatusService.list()
    await this.levelNamesService.list()
  }

  async initLoadDoc(profileId: any) {
    await this.candidatesService.getById(profileId)
    await this.departmentNamesService.list()
    await this.candidatesStatusService.list()
    await this.levelNamesService.list()
    const doc = this.candidatesMapper.profile

    runInAction(() => {
      this.currentForm = doc && ({
        _id: doc!._id,
        firstname: doc!.firstname,
        lastname: doc!.lastname,
        email: doc!.email,
        phoneNumber: doc!.phoneNumber,
        skype: doc!.skype,
        department: doc!.department._id ? doc!.department._id : null,
        experience: doc!.experience,
        level: doc!.level._id ? doc!.level._id : null,
        status: doc!.status._id ? doc!.status._id : null,
        comment: doc!.comment,
        attachedCV: doc!.attachedCV ? doc!.attachedCV : null,
        date: doc!.date ? doc!.date : null,
      })

      this.title = doc!.firstname.concat(' ', doc!.lastname)

      this.chosenDepartment = doc!.department ? {
        value: doc!.department,
        label: doc!.department.name
      } : null

      this.chosenStatus = doc!.status ? {
        value: doc!.status,
        label: doc!.status.name
      } : null

      this.chosenLevel = doc!.level ? {
        value: doc!.level,
        label: doc!.level.name
      } : null

      if (doc!.status.name === CANDIDATE_STATUSES.HIRED) {
        this.showHideButtonHire = false
      }

      if (doc!.status.name === CANDIDATE_STATUSES.HIRED || doc!.status.name === CANDIDATE_STATUSES.INTERN) {
        this.showHideButtonInterviewInvite = false
      }

      if (doc!.status.name === CANDIDATE_STATUSES.HIRED) {
        this.showHideButtonSendMessage = false
      }
    })
  }

  async initCategoriesAndOptions() {
    runInAction(() => {
      this.allDepartments = this.departmentNamesMapper.list
      this.allStatuses = this.candidatesStatusMapper.list
      this.allLevels = this.levelNamesMapper.list
    })
  }

  showWithAnimation = () => {
    const base = document.getElementById('base-view')
    if (base) {
      base.classList.add('animated-view')
    }
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

  removeLoader = () => {
    const ele = document.getElementById('loader')
    if (ele && ele.classList.contains('load')) {
      ele.classList.remove('load')
    }
  }

  componentWillUnmount() {

  }

  async componentWillReceiveProps(newProps: any) {
    this.addLoader()
    this.removeAnimation()
    if (newProps.match.url === '/candidates/create') {
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
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      skype: '',
      department: null,
      experience: '',
      level: null,
      status: null,
      comment: [],
      attachedCV: null
    }

    this.chosenDepartment = null
    this.chosenLevel = null
    this.chosenStatus = null
  }

  render() {
    return (
      <div id="base-view">
        <div className="back-to-desktop" onClick={this.toCandidatesListing}>
          <img src="../../../img/back-arrow.svg" alt="back"/>
          <p className="lh19 size16 bold">Back to Candidates</p>
        </div>
        <p className="form-name size36 semibold">
          {this.isNew ? 'Create candidate ' : this.title}
        </p>
        <form className={`purchase-order `} action="#">

          <div className="step open">

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('firstname')}
              field={'firstname'}
              title={'Firstname'}
              value={this.currentForm.firstname}
              required={true}
            />

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('lastname')}
              field={'lastname'}
              title={'Lastname'}
              value={this.currentForm.lastname}
              required={true}
            />

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('email')}
              field={'email'}
              title={'Email'}
              value={this.currentForm.email}
              required={true}
            />

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('phoneNumber')}
              field={'phoneNumber'}
              title={'Phone number'}
              value={this.currentForm.phoneNumber}
              required={true}
            />

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('skype')}
              field={'skype'}
              title={'Skype'}
              value={this.currentForm.skype}
            />

            <section className="input-section">
              <p className="size16 input-name ">Department</p>

              <DefaultSelect
                form={this.candidatesProfileValidationForm}
                field={'department'}
                placeholder=''
                value={this.chosenDepartment}
                clearable={false}
                onChange={(type) => this.departmentTypeChanged(type)}
                boldInput={true}
                options={this.allDepartments.map((type: any) => {
                  return {
                    value: type,
                    label: type.name
                  }
                })}
              />
            </section>

            <RegistrationField
              form={this.candidatesProfileValidationForm}
              onChange={this.textChangeHandlerFor('experience')}
              field={'experience'}
              title={'Experience'}
              value={this.currentForm.experience}
            />

            <section className="input-section">
              <p className="size16 input-name ">Level</p>

              <DefaultSelect
                form={this.candidatesProfileValidationForm}
                field={'level'}
                placeholder=''
                value={this.chosenLevel}
                clearable={false}
                onChange={(type) => this.levelChanged(type)}
                boldInput={true}
                options={this.allLevels.map((type: any) => {
                  return {
                    value: type,
                    label: type.name
                  }
                })}
              />
            </section>

            <section className="input-section">
              <p className="size16 input-name ">Status</p>

              <DefaultSelect
                form={this.candidatesProfileValidationForm}
                field={'status'}
                placeholder=''
                value={this.chosenStatus}
                clearable={false}
                onChange={(status) => this.statusChanged(status)}
                boldInput={true}
                options={this.allStatuses.map((type: any) => {
                  return {
                    value: type,
                    label: type.name
                  }
                })}
              />
            </section>

            {/*... CV*/}
            {!this.currentForm.attachedCV ?
              <section className="sections-50">
                <section className="input-section">
                  <p className="size16 input-name">CV Attached</p>
                  <Dropzone accept={'image/jpeg,image/png,.doc, application/pdf,.odt,.txt,text/*,application/*'}
                            className="file-card" onDrop={this.pickDocument}>
                    <a className="file-name">{this.uploadProgress}</a>
                  </Dropzone>
                </section>
              </section> :
              <section
                className={`sections-50 ${this.currentForm.attachedCV && this.currentForm.attachedCV.originalname ? 'active' : ''}`}>
                <section className="input-section">
                  <p className="size16 input-name">CV Attached</p>
                  <a
                    className="file-card"
                    href={`http://localhost:8081/api/files/${this.currentForm.attachedCV.filename}`}
                    target="_blank"
                  >
                    <span
                      className="file-name">{this.currentForm.attachedCV ? this.currentForm.attachedCV.originalname || this.uploadProgress : null}</span>
                    <span className="file-size">{this.currentForm.attachedCV && this.currentForm.attachedCV.size ?
                      (this.currentForm.attachedCV.size + 'kb') : null}</span>
                  </a>
                </section>
              </section>}

            <div className={`documents-popup pay-and-receive-popup ${this.showErrorPopup && 'open'}`}>
              <div className="popup">
                <p className="size16">File limit of <b>~ 6MB</b> has been exceeded.</p>
                <div className="popup-button">
                  <a className="button black" onClick={this.hideError}>Ok</a>
                </div>
              </div>
            </div>

            <div className={`documents-popup pay-and-receive-popup ${this.showFormatErrorPopup && 'open'}`}>
              <div className="popup">
                <p className="size16">Only <b>JPEG</b>, <b>PNG</b> and <b>PDF</b> files are supported</p>
                <div className="popup-button">
                  <a className="button black" onClick={this.hideError}>Ok</a>
                </div>
              </div>
            </div>

            <div className={`documents-popup confirm-decline-popup ${this.showConfirmationPopup && 'open'}`}>
              <h2 className="size24 pay-money-title">Upload file</h2>
              <div className="pay-money-image">
                <ExifOrientationImg
                  className="pay-money-image"
                  src={this.preview}
                  alt="Preview"
                />
              </div>
            </div>

            {this.arrayOfEntitiesComment.map((comment: any) =>
              <li key={comment.commentName} className='clear'>
                <section className="input-section">
                  <textarea
                    className='textarea-control size14'
                    placeholder=''
                    defaultValue={this.commentsObj[comment.commentName]}
                    onChange={(event) => this.arrayChangeHandlerFor(event, comment.commentName)}
                  />
                  <p className="size16 comment"> {this.currentUser.email}</p>
                </section>
              </li>
            )}

            <p className="add-click " onClick={() => this.addNewComment()}>+ Add comment</p>

          </div>
        </form>

        <div className="step-buttons-check">
          {!this.isNew && this.showHideButtonInterviewInvite &&
          <a className={`button button-flex`}
             style={{width: `224px`}}
             onClick={this.redirectToCreateInterviewPage}
          >
            Invite to interview
          </a>}

          {!this.isNew && this.showHideButtonHire &&
          <a className={`button button-flex`}
             style={{width: `112px`}}
             onClick={() => this.hireCandidate()}
          >
            Hire
          </a>}

          {!this.isNew && this.showHideButtonSendMessage &&
          <a className={`button button-flex`}
             style={{width: `193px`}}
            // onClick={this.approve}
          >
            Send Message
          </a>}

          {!this.isNew &&
          <a className={`button button-flex`}
             style={{width: `131px`}}
             onClick={() => this.showHidePopup(true)}
          >
            Delete
          </a>}

          <a className={`button button-flex`}
             style={{width: `117px`}}
             onClick={() => this.createProfile()}
          >
            Save
          </a>
        </div>

        {this.showDeleteError &&
        <AlertPopup
          title={`Delete ${this.currentForm.firstname}  ${this.currentForm.lastname} profile?`}
          isSingleOption={false}
          actionClicked={() => this.deleteProfile()}
          actionTitle={'Yes, remove'}
          cancelTitle={'Cancel'}
          cancelClicked={() => this.showHidePopup(false)}
        />}

      </div>
    )
  }

  arrayChangeHandlerFor(event: any, commentName: string) {

    this.commentsObj[commentName] = event.target.value || null
  }

  @action
  addNewComment() {
    this.commentCounter++
    let comment = {
      field: 'comment',
      commentName: 'comment ' + this.commentCounter,
      fieldTitle: ''
    }
    this.arrayOfEntitiesComment.push(comment)
  }

  toCandidatesListing = () => {
    this.props.history.push(`/candidates`)
  }

  @action
  departmentTypeChanged(type: any) {
    this.chosenDepartment = type ? type : null
    this.currentForm.department = type ? type.value._id : null
  }

  @action
  levelChanged(type: any) {
    this.chosenLevel = type ? type : null
    this.currentForm.level = type ? type.value._id : null
  }

  @action
  statusChanged(type: any) {
    this.chosenStatus = type ? type : null
    this.currentForm.status = type ? type.value._id : null
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    this.currentForm[fieldName] = event.target.value || null

  })

  private pickDocument = action((files: File[], failed: File[]) => {
    if (failed.length) {
      this.showFormatError()
      return
    }
    if (files[0].size > 6 * 1024 * 1024) {
      this.showError()
      return
    }

    const file = files[0]
    this.selectedCV = file
    this.uploadDocument(file)
  })

  private showError = action(() => {
    this.showErrorPopup = true
  })

  private uploadDocument = action(async (file: File) => {
    this.showConfirmationPopup = false
    this.uploadProgress = 'Processing...'
    this.isUploading = true
    const result = await this.documentService.uploadOnCreate({
      progress: 0,
      file
    })
    console.log('result = ' + result)
    runInAction(() => {
      this.isUploading = false
      if (this.showFileName) {
        this.currentForm.attachedCV = result && result.uploadedId ? result.uploadedId : null
        this.uploadProgress = this.selectedCV.name
      }
    })
  })

  showHidePopup = action((show: boolean) => {
    this.showDeleteError = show
  })

  private showFormatError = action(() => {
    this.showFormatErrorPopup = true
  })

  private hideError = action(() => {
    this.showErrorPopup = false
    this.showFormatErrorPopup = false
  })

  deleteProfile = action(async () => {
    this.showHidePopup(false)
    await this.candidatesService.delete(this.currentForm._id)
  })

  async createProfile() {
    this.candidatesProfileValidationForm.update(this.currentForm)
    const isValid = await this.checkFields()
    if (!isValid) {
      return
    }

    const promise = this.isNew ? this.candidatesService.createProfile(this.currentForm) : this.candidatesService.update(this.props.match.params.id, this.currentForm)
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

  async hireCandidate() {
    this.isHireCandidate = true
    this.allStatuses.forEach((status: any) => {
      if (status.name === CANDIDATE_STATUSES.HIRED) {
        this.currentForm.status = status._id
      }
    })
    this.createProfile()
  }

  async checkFields(): Promise<boolean> {
    const forms = [
      this.candidatesProfileValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return false
    }
    return true
  }

  private redirectToCreateInterviewPage = () => {
    this.props.history.push({
      pathname: '/interviews/create',
      state: {candidateId: this.currentForm._id}
    })
  }
}
