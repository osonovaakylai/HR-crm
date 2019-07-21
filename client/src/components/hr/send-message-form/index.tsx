import * as React from 'react'
import {observer} from 'mobx-react'
import DefaultSelect from '../../default-select/default-select'
import sendMessageValidationForm from '../../../validation/send-message-validation'
import DefaultTextarea from '../../default-textarea/default-textarea'
import RegistrationField from '../../registration-field/registration-field'

import {
  action,
  observable,
  runInAction
} from 'mobx'
import {instanceRegistry} from "../../../common/annotations/common";
import {RecipientListMapper, SendMessageMapper} from "../../../mappers";
import {RecipientListService, SendMessageService} from "../../../services";

interface Props {
  history: any
  match: any
}

@observer
export default class SendMessageForm extends React.Component<Props, {}> {

  private recipientListService: RecipientListService = instanceRegistry.get('RecipientListService')
  private sendMessageService: SendMessageService = instanceRegistry.get('SendMessageService')

  private recipientListMapper: RecipientListMapper = instanceRegistry.get('RecipientListMapper')
  private sendMessageMapper: SendMessageMapper = instanceRegistry.get('SendMessageMapper')


  constructor(props: any) {
    super(props)
    this.sendMessageValidationForm = sendMessageValidationForm()
  }

  @observable
  private currentForm: any = {
    topic: '',
    recipients: [],
    message: '',
    link: ''
  }

  @observable
  private sendMessageValidationForm: any

  @observable
  private allRecipients: any = []

  componentWillMount() {
    document.title = 'Send message'
    this.addLoader()
  }

  async componentDidMount() {
    await this.initLoad()
    this.initCategoriesAndOptions()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    await this.recipientListService.list()
  }

  async initCategoriesAndOptions() {
    runInAction(() => {
      this.allRecipients = this.recipientListMapper.list
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

  addLoader = () => {
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  render() {
    const sendMessageFormMessageError = this.sendMessageValidationForm.errors()['message']
    const sendMessageFormRecipientError = this.sendMessageValidationForm.errors()['recipient']
    return (
      <div id="base-view">
        <p className="form-name size36 semibold">
          Send Message
        </p>

        <form className={`purchase-order `} action="#">

          <div className="step open">

            <RegistrationField
              form={this.sendMessageValidationForm}
              onChange={this.textChangeHandlerFor('topic')}
              field={'topic'}
              title={'Theme'}
              value={this.currentForm.topic}
              required={true}
            />

            <section className="input-section">
              <p className="size16 input-name required">Receiver</p>

              <DefaultSelect
                form={this.sendMessageValidationForm}
                field={'recipients'}
                clearable={false}
                onChange={(type) => this.recipientChanged(type)}
                isMulti={true}
                options={this.allRecipients.map((type: any) => {
                  return {
                    value: type,
                    label: type.email
                  }
                })}
              />

              <p className="size16 invalid">
                {typeof sendMessageFormRecipientError === 'string' ? sendMessageFormRecipientError : ''}
              </p>

            </section>

            <DefaultTextarea
              form={this.sendMessageValidationForm}
              onChange={this.textChangeHandlerFor('message')}
              field={'message'}
              title={'Message'}
              value={this.currentForm.message}
              required={true}
            />
            <p className="size16 invalid">
              {typeof sendMessageFormMessageError === 'string' ? sendMessageFormMessageError : ''}
            </p>

            <RegistrationField
              form={this.sendMessageValidationForm}
              onChange={this.textChangeHandlerFor('link')}
              field={'link'}
              title={'Link'}
              value={this.currentForm.link}
              required={false}
            />

          </div>
        </form>

        <div className="step-buttons-check">
          <a className={`button`}
            onClick={() => this.sendMessage()}
          >
            Send
          </a>
        </div>
      </div>
    )
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    this.currentForm[fieldName] = event.target.value || null
  })

  @action
  recipientChanged(type: any) {
    this.currentForm.recipients = []
    type.forEach((item: any) => {
      if(item) {
        return this.currentForm.recipients.push(item.label)
      }
    });
  }

  async sendMessage() {
    this.sendMessageValidationForm.update(this.currentForm)
    const isValid = await this.checkFields()
    if (!isValid) {
      return
    }

    const promise = this.sendMessageService.sendMessage(this.currentForm)
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
      this.sendMessageValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return false
    }

    return true
  }
}
