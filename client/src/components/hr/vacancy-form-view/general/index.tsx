import * as React from 'react'
import {observer} from 'mobx-react'
import vacancyFormValidation from '../../../../validation/vacancy-form-validation'
import DefaultTextarea from '../../../default-textarea/default-textarea'
import RegistrationField from '../../../registration-field/registration-field'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import {VacanciesMapper} from '../../../../mappers'

import {
  DocumentService,
  VacanciesService
} from '../../../../services'

import {instanceRegistry} from '../../../../common/annotations/common'
import AlertPopup from '../../../alert-popup/alert-popup'

const Dropzone: any = require('react-dropzone').default
const ExifOrientationImg: any = require('react-exif-orientation-img').default

interface Props {
  history: any
  match: any
}

interface SocMedia {
  name: { [key: string]: boolean }
}

@observer
export default class VacancyFormView extends React.Component<Props, {}> {

  private documentService: DocumentService = instanceRegistry.get('DocumentService')
  private vacanciesService: VacanciesService = instanceRegistry.get('VacanciesService')

  private vacanciesMapper: VacanciesMapper = instanceRegistry.get('VacanciesMapper')
  private isNew: boolean = this.props.match.url === '/vacancies/create'

  @observable
  private currentForm: any = {
    _id: null,
    tarif: '',
    topic: '',
    vacancyName: '',
    city: '',
    requirement: '',
    optional: '',
    address: '',
    education: '',
    schedule: '',
    experience: '',
    condition: '',
    responsibility: '',
    other: '',
    salary: '',
    employmentType: '',
    socialMedia: [],
    attachedFile: null,
    status: ''
  }

  @observable
  private socMedia: SocMedia = {
    name: {
      Headhunter: false,
      Diesel: false,
      Telegram: false,
      Facebook: false,
      Instagram: false,
      Jobkg: false,
    }
  }

  @observable
  private isUploading: boolean = false

  @observable
  private selectedFile: File

  @observable
  private showConfirmationPopup: boolean

  @observable
  private uploadProgress: string = 'Attach a file'

  @observable
  private vacancyValidationForm: any

  @observable
  private showFormatErrorPopup: boolean

  @observable
  private showErrorPopup: boolean

  @observable
  private showFileName: boolean = true

  @observable
  private showDeleteError: boolean = false

  @observable
  private preview: any

  constructor(props: any) {
    super(props)
    this.vacancyValidationForm = vacancyFormValidation()
    this.vacancyValidationForm.update(this.currentForm)
    this.vacancyValidationForm.validate({showErrors: false})
  }

  componentWillMount() {
    document.title = 'Vacancy Form'
    this.addLoader()
  }

  async componentDidMount() {
    this.isNew ? await this.initLoad() : await this.initLoadDoc(this.props.match.params.id)
    this.showWithAnimation()
    this.removeLoader()

  }

  async initLoad() {
    await this.vacanciesService.list()
  }

  async initLoadDoc(vacId: any) {
    await this.vacanciesService.getById(vacId)
    const vac = this.vacanciesMapper.vacancy

    runInAction(() => {
      this.currentForm = vac && {
        _id: vac!._id,
        tarif: vac!.tarif,
        topic: vac!.topic,
        vacancyName: vac!.vacancyName,
        city: vac!.city,
        requirement: vac!.requirement,
        optional: vac!.optional,
        address: vac!.address,
        education: vac!.education,
        schedule: vac!.schedule,
        experience: vac!.experience,
        condition: vac!.condition,
        responsibility: vac!.responsibility,
        other: vac!.other,
        salary: vac!.salary,
        employmentType: vac!.employmentType,
        socialMedia: vac!.socialMedia,
        attachedFile: vac!.attachedFile ? vac!.attachedFile : null
      }
    })
  }

  showWithAnimation = () => {
    const base = document.getElementById('base-view')
    if (base && !base.classList.contains('animated-view')) {
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

  async componentWillReceiveProps(newProps: any) {
    console.log('I am in componentWillReceiveProps  ' + this.isNew)
    this.addLoader()
    this.removeAnimation()
    if (newProps.match.url === '/vacancies/create') {
      this.isNew = true
    }
    this.isNew ? this.refreshNew() : await this.initLoadDoc(newProps.match.params.id)
    this.showWithAnimation()
    this.removeLoader()
  }

  @action
  refreshNew() {
    this.currentForm = {
      _id: null,
      tarif: '',
      topic: '',
      vacancyName: '',
      city: '',
      requirement: '',
      optional: '',
      address: '',
      education: '',
      schedule: '',
      experience: '',
      condition: '',
      responsibility: '',
      other: '',
      salary: '',
      employmentType: '',
      socialMedia: [],
      attachedFile: null,
      status: ''
    }
  }

  render() {
    return (
      <div id="base-view">

        <form className={`purchase-order `} action="#">

          <div className="step open">

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('tarif')}
              field={'tarif'}
              title={'Vacancies rate'}
              value={this.currentForm.tarif}
              required={true}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('topic')}
              field={'topic'}
              title={'Topic'}
              value={this.currentForm.topic}
              required={true}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('vacancyName')}
              field={'vacancyName'}
              title={'Vacancies name'}
              value={this.currentForm.vacancyName}
              required={true}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('city')}
              field={'city'}
              title={'City'}
              value={this.currentForm.city}
              required={true}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('requirement')}
              field={'requirement'}
              title={'Requirement(s)'}
              value={this.currentForm.requirement}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('optional')}
              field={'optional'}
              title={'Optional requirements(s)'}
              value={this.currentForm.optional}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('address')}
              field={'address'}
              title={'Address'}
              value={this.currentForm.address}
              required={true}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('education')}
              field={'education'}
              title={'Education'}
              value={this.currentForm.education}
              required={true}
            />

          </div>
          <div className="step open margin-top">

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('schedule')}
              field={'schedule'}
              title={'Schedule'}
              value={this.currentForm.schedule}
              required={true}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('experience')}
              field={'experience'}
              title={'Experience'}
              value={this.currentForm.experience}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('condition')}
              field={'condition'}
              title={'Working conditions'}
              value={this.currentForm.condition}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('responsibility')}
              field={'responsibility'}
              title={'Responsibility'}
              value={this.currentForm.responsibility}
            />

            <DefaultTextarea
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('other')}
              field={'other'}
              title={'Other'}
              value={this.currentForm.other}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('salary')}
              field={'salary'}
              title={'Salary'}
              value={this.currentForm.salary}
              required={true}
            />

            <RegistrationField
              form={this.vacancyValidationForm}
              onChange={this.textChangeHandlerFor('employmentType')}
              field={'employmentType'}
              title={'Type of employment'}
              value={this.currentForm.employmentType}
              required={true}
            />

            {/*Attached Image*/}
            {!this.currentForm.attachedFile ?
              <section className="sections-50">
                <section className="input-section">
                  <p className="size16 input-name">Image Attached</p>
                  <Dropzone accept={'image/jpeg,image/png,application/pdf,text/*,application/*'}
                            className="file-card" onDrop={this.pickDocument}>
                    <a className="file-name">{this.uploadProgress}</a>
                  </Dropzone>
                </section>
              </section> :
              <section
                className={`sections-50 ${this.currentForm.attachedFile && this.currentForm.attachedFile.originalname ? 'active' : ''}`}>
                <section className="input-section">
                  <p className="size16 input-name">File Attached</p>
                  <a
                    className="file-card"
                    href={`http://localhost:8081/api/files/${this.currentForm.attachedFile.filename}`}
                    target="_blank"
                  >
                    <span
                      className="file-name">{this.currentForm.attachedFile ? this.currentForm.attachedFile.originalname || this.uploadProgress : null}</span>
                    <span className="file-size">{this.currentForm.attachedFile && this.currentForm.attachedFile.size ?
                      (this.currentForm.attachedFile.size + 'kb') : null}</span>
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

            <span className='check-box-block'>
              <input
                type="checkbox"
                name="Diesel"
                checked={this.socMedia.name.Diesel}
                className={'check-box'}
                onChange={this.handleCheckbox('Diesel')}
              />
            <span className='check-box-label'>Diesel</span>
            </span>
            <span className='check-box-block'>
              <input
                type="checkbox"
                name="Facebook"
                checked={this.socMedia.name.Facebook}
                className={'check-box'}
                onChange={this.handleCheckbox('Facebook')}
              />
               <span className='check-box-label'>Facebook</span>
            </span>
            <span className='check-box-block'>
              <input
                type="checkbox"
                name="Headhunter"
                checked={this.socMedia.name.Headhunter}
                className={'check-box'}
                onChange={this.handleCheckbox('Headhunter')}
              />
              <span className='check-box-label'>Headhunter</span>
              </span>
            <span className='check-box-block'>
            <input
              type="checkbox"
              name="Instagram"
              checked={this.socMedia.name.Instagram}
              className={'check-box'}
              onChange={this.handleCheckbox('Instagram')}
            />
              <span className='check-box-label'>Instagram</span>
              </span>
            <span className='check-box-block'>
            <input
              type="checkbox"
              name="Jobkg"
              checked={this.socMedia.name.Jobkg}
              className={'check-box'}
              onChange={this.handleCheckbox('Jobkg')}
            />
              <span className='check-box-label'>Jobkg</span>
              </span>
            <span className='check-box-block'>
            <input
              type="checkbox"
              name="Telegram"
              checked={this.socMedia.name.Telegram}
              className={'check-box'}
              onChange={this.handleCheckbox('Telegram')}
            />
              <span className='check-box-label'>Telegram</span>
              </span>
          </div>
        </form>

        <div className="step-buttons-check">
          {!this.isNew &&
          <a className={`button`}
             onClick={() => this.showHidePopup(true)}
          >
            Delete
          </a>}

          <a className={`button`}
             onClick={() => this.createVacancy()}
          >
            Save
          </a>
        </div>

        {this.showDeleteError &&
        <AlertPopup
          title={`Delete vacancy ${this.currentForm.vacancyName} ?`}
          isSingleOption={false}
          actionClicked={() => this.deleteVacancy()}
          actionTitle={'Yes, remove'}
          cancelTitle={'Cancel'}
          cancelClicked={() => this.showHidePopup(false)}
        />}
      </div>
    )
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
    this.selectedFile = file
    this.uploadDocument(file)
  })

  private uploadDocument = action(async (file: File) => {
    this.showConfirmationPopup = false
    this.uploadProgress = 'Processing...'
    this.isUploading = true
    const result = await this.documentService.uploadOnCreate({
      progress: 0,
      file
    })
    runInAction(() => {
      this.isUploading = false
      if (this.showFileName) {
        this.currentForm.attachedFile = result && result.uploadedId ? result.uploadedId : null
        this.uploadProgress = this.selectedFile.name
      }
    })
  })

  private showError = action(() => {
    this.showErrorPopup = true
  })

  handleCheckbox = (fieldName: string) => action(() => {
    let value = this.socMedia.name[fieldName]
    this.socMedia.name[fieldName] = !value

  })

  private showFormatError = action(() => {
    this.showFormatErrorPopup = true
  })

  private hideError = action(() => {
    this.showErrorPopup = false
    this.showFormatErrorPopup = false
  })

  showHidePopup = action((show: boolean) => {
    this.showDeleteError = show
  })

  deleteVacancy = action(async () => {
    this.showHidePopup(false)
    await this.vacanciesService.delete(this.currentForm._id)
  })

  async createVacancy() {
    this.vacancyValidationForm.update(this.currentForm)
    const isValid = await this.checkFields()
    if (!isValid) {
      return
    }

    this.currentForm.status = 'active'

    const promise = this.isNew ? this.vacanciesService.createVacancy(this.currentForm) : this.vacanciesService.update(this.props.match.params.id, this.currentForm)
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

  async checkFields(): Promise<boolean> {
    const forms = [
      this.vacancyValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return false
    }

    return true
  }
}
