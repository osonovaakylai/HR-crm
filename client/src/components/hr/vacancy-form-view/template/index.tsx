import * as React from 'react'
import {observer} from 'mobx-react'
import DefaultTextarea from '../../../default-textarea/default-textarea'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import {instanceRegistry} from '../../../../common/annotations/common'
import vacancyTemplateValidation from '../../../../validation/vacancy-template-validation'
import {
  VacancyTemplateService
} from '../../../../services/index'

import {
  VacancyTemplateMapper
} from '../../../../mappers/index'

interface Props {
  history: any
  match: any
}

@observer
export default class TemplateFormView extends React.Component<Props, {}> {
  private vacancyTemplateService: VacancyTemplateService = instanceRegistry.get('VacancyTemplateService')
  private vacancyTemplateMapper: VacancyTemplateMapper = instanceRegistry.get('VacancyTemplateMapper')

  @observable
  private currentForm: any = {
    description: ''
  }

  @observable
  private vacancyTemplateValidationForm: any

  constructor(props: any) {
    super(props)
    this.vacancyTemplateValidationForm = vacancyTemplateValidation()
  }

  componentWillMount() {
    document.title = 'Vacancy Template'
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
    await this.vacancyTemplateService.getTemplate()
    const temp = this.vacancyTemplateMapper.template
    runInAction(() => {
      this.currentForm = temp && ({
        description: temp!.description
      })
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

  componentWillUnmount() {

  }

  async componentWillReceiveProps(newProps: any) {

  }

  render() {

    return (
      <div id="base-view">

        <form className={`purchase-order `} action="#">

        <div className="step open">
          <DefaultTextarea
            form={this.vacancyTemplateValidationForm}
            onChange={this.textChangeHandlerFor('description')}
            field={'description'}
            title={'Template'}
            value={this.currentForm.description}
          />
        </div>

        </form>

        <div className="step-buttons-check">
          <a className={`button`}
             id="approve"
            // onClick={this.approve}
          >
            SAVE
          </a>
        </div>
      </div>
    )
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    this.currentForm[fieldName] = event.target.value || null

  })
}
