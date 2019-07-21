import * as React from 'react'
import {observer} from 'mobx-react'
import DefaultSelect from '../../default-select/default-select'
import positionEditValidation from '../../../validation/position-edit-validation'
import DefaultTextarea from '../../default-textarea/default-textarea'
import RegistrationField from '../../registration-field/registration-field'
import AlertPopup from '../../alert-popup/alert-popup'

import {
  action,
  observable,
  runInAction
} from 'mobx'

import {instanceRegistry} from '../../../common/annotations/common'
import {
  PositionMapper,
  PositionNamesMapper,
  DepartmentNamesMapper,
  LevelNamesMapper
} from '../../../mappers'

import {
  PositionService,
  PositionNamesService,
  DepartmentNamesService,
  LevelNamesService
} from '../../../services'
import {AuthService} from '../../../services/index'

import * as NumericInput from "react-numeric-input"

interface Props {
  history: any
  match: any
}

@observer
export default class PositionsFormView extends React.Component<Props, {}> {

  private positionService: PositionService = instanceRegistry.get('PositionService')
  private positionNamesService: PositionNamesService = instanceRegistry.get('PositionNamesService')
  private departmentNamesService: DepartmentNamesService = instanceRegistry.get('DepartmentNamesService')
  private levelNamesService: LevelNamesService = instanceRegistry.get('LevelNamesService')

  private positionMapper: PositionMapper = instanceRegistry.get('PositionMapper')
  private positionNamesMapper: PositionNamesMapper = instanceRegistry.get('PositionNamesMapper')
  private departmentNamesMapper: DepartmentNamesMapper = instanceRegistry.get('DepartmentNamesMapper')
  private levelNamesMapper: LevelNamesMapper = instanceRegistry.get('LevelNamesMapper')

  private isNew: boolean = this.props.match.url === '/positions/create'

  @observable
  private currentForm: any = {
    department: null,
    amount: 0,
    position: null,
    requirement: '',
    requirements: [],
    skills: [],
    skill: '',
    level: null,
    general: '',
    status: '',
    creator: '',
  }

  @observable
  private showSomethingError: boolean = false

  @observable
  private chosenDepartment: any

  @observable
  private title: string

  @observable
  private chosenPosition: any

  @observable
  private chosenLevel: any

  @observable
  private positionValidationForm: any

  @observable
  private arrayOfEntitiesRequirement: any = []

  @observable
  private arrayOfEntitiesSkill: any = []

  @observable
  private requirementsObj: any = {}

  @observable
  private requirement: string

  @observable
  private requirementCounter: number = 1

  @observable
  private skill: string

  @observable
  private skillsObj: any = {}

  @observable
  private skillCounter: number = 1

  @observable
  private allDepartments: any = []

  @observable
  private allPositions: any = []

  @observable
  private allLevels: any = []

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  constructor(props: any) {
    super(props)
    this.positionValidationForm = positionEditValidation()
  }

  componentWillMount() {
    document.title = 'Positions form'
    this.addLoader()
  }

  async componentDidMount() {
    this.isNew ? await this.initLoad() : await this.initLoadDoc(this.props.match.params.id)
    this.initCategoriesAndOptions()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    const defaultQueryParams = {
      status: {
        label: 'All Statuses',
        value: 'all'
      }
    }
    await this.positionService.list(defaultQueryParams)
    await this.departmentNamesService.list()
    await this.positionNamesService.list()
    await this.levelNamesService.list()
  }

  async initCategoriesAndOptions() {
    runInAction(() => {
      this.allDepartments = this.departmentNamesMapper.list
      this.allPositions = this.positionNamesMapper.list
      this.allLevels = this.levelNamesMapper.list
    })
  }

  async initLoadDoc(posId: any) {
    this.departmentNamesService.list()
    this.positionNamesService.list()
    this.levelNamesService.list()
    await this.positionService.getById(posId)
    const pos = this.positionMapper.position
    this.fillRequirements(pos)
    this.fillSkills(pos)
    runInAction(() => {
      this.currentForm = pos && ({
        department: pos!.department._id ? pos!.department._id : null,
        amount: pos!.amount,
        position: pos!.position._id ? pos!.position._id : null,
        skill: pos!.skill,
        level: pos!.level._id ? pos!.level._id : null,
        general: pos!.general,
        requirement: pos!.requirement
      })

      this.title = pos!.position.name

      this.chosenDepartment = pos!.department ? {
        value: pos!.department,
        label: pos!.department.name
      } : null

      this.chosenPosition = pos!.position ? {
        value: pos!.position,
        label: pos!.position.name
      } : null

      this.chosenLevel = pos!.level ? {
        value: pos!.level,
        label: pos!.level.name
      } : null
    })

  }

  fillSkills = (pos: any) => {
    let counter = 1
    runInAction(() => {
      this.currentForm.skills = pos!.skills
    })

    this.currentForm.skills.forEach((skill: any) => {
      counter++
      const index = 'skills' + counter
      this.skillsObj[index] = skill
      this.addNewSkill()
    })
  }

  fillRequirements = (pos: any) => {
    let counter = 1
    runInAction(() => {
      this.currentForm.requirements = pos!.requirements
    })

    this.currentForm.requirements.forEach((req: any) => {
      counter++
      const requirement = 'requirements' + counter
      this.requirementsObj[requirement] = req
      this.addNewRequirement()
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

  componentWillUnmount() {

  }

  async componentWillReceiveProps(newProps: any) {
    console.log('I am in componentWillReceiveProps')
    this.addLoader()
    this.removeAnimation()
    if (newProps.match.url === '/positions/create') {
      this.isNew = true;
    }
    this.isNew ? this.refreshNew() : await this.initLoadDoc(newProps.match.params.id)
    this.showWithAnimation()
    this.removeLoader()
  }

  @action
  refreshNew() {
    this.currentForm = {
      department: null,
      amount: 0,
      position: null,
      requirement: '',
      requirements: [],
      skills: [],
      skill: '',
      level: null,
      general: '',
      status: ''
    }
    this.chosenDepartment = null
    this.chosenLevel = null
    this.chosenPosition = null
  }

  render() {

    return (
      <div id="base-view">
        <div className="back-to-desktop" onClick={this.toPositionsListing}>
          <img src="../../../img/back-arrow.svg" alt="back"/>
          <p className="lh19 size16 bold">Back to Positions</p>
        </div>

        <p className="form-name size36 semibold">
          {this.isNew ? 'Create position ' : this.title}
        </p>

        <form className={`purchase-order `} action="#">

          <div className="step open">

            <section className="input-section">
              <p className="size16 input-name ">Position</p>

              <DefaultSelect
                form={this.positionValidationForm}
                field={'position'}
                placeholder=''
                value={this.chosenPosition}
                clearable={false}
                onChange={(type) => this.positionTypeChanged(type)}
                boldInput={true}
                options={this.allPositions.map((type: any) => {
                  return {
                    value: type,
                    label: type.name
                  }
                })}
              />

            </section>


            <section className="input-section input-section-right-half">
              <p className="size16 input-name ">Department</p>

              <DefaultSelect
                form={this.positionValidationForm}
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

            <section className="input-section input-section-left-half">
              <p className="size16 input-name ">Amount</p>
              <NumericInput
                min={0}
                max={100}
                onChange={this.textChangeHandlerFor('amount')}
                value={this.currentForm.amount}/>
            </section>

            <section className="clear">
              <RegistrationField
                form={this.positionValidationForm}
                onChange={this.textChangeHandlerFor('requirement')}
                field={'requirement'}
                title={'Requirements'}
                value={this.currentForm.requirement}
              />
            </section>

            {this.arrayOfEntitiesRequirement.map((requirement: any) =>
              <li key={requirement.requirementName}>
                <section className="input-section">
                  <p
                    className="size16 input-name">{requirement.fieldTitle + (this.arrayOfEntitiesRequirement.indexOf(requirement) + 2)}</p>
                  <input
                    type="text"
                    defaultValue={this.requirementsObj[requirement.requirementName]}
                    onChange={(event) => this.arrayChangeHandlerForRequirements(event, requirement.requirementName)}/>
                  <p className="size14 invalid">This is a required field</p>
                </section>
                <div className="input-clear"
                     onClick={() => this.removeRequirement(this.arrayOfEntitiesRequirement.indexOf(requirement), requirement.requirementName)}></div>
              </li>
            )}

            <p className="add-click" onClick={() => this.addNewRequirement()}>+ Add requirement</p>


            <RegistrationField
              form={this.positionValidationForm}
              onChange={this.textChangeHandlerFor('skill')}
              field={'skill'}
              title={'Skills'}
              value={this.currentForm.skill}
            />

            {this.arrayOfEntitiesSkill.map((skill: any) =>
              <li key={skill.skillName}>
                <section className="input-section">
                  <p
                    className="size16 input-name">{skill.fieldTitle + (this.arrayOfEntitiesSkill.indexOf(skill) + 2)}</p>
                  <input
                    type="text"
                    defaultValue={this.skillsObj[skill.skillName]}
                    onChange={(event) => this.arrayChangeHandlerForSkills(event, skill.skillName)}/>
                  <p className="size14 invalid">This is a required field</p>
                </section>
                <div className="input-clear"
                     onClick={() => this.removeSkill(this.arrayOfEntitiesSkill.indexOf(skill), skill.skillName)}></div>
              </li>
            )}

            <p className="add-click" onClick={() => this.addNewSkill()}>+ Add skill</p>


            <section className="input-section">
              <p className="size16 input-name ">Level</p>

              <DefaultSelect
                form={this.positionValidationForm}
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


            <DefaultTextarea
              form={this.positionValidationForm}
              onChange={this.textChangeHandlerFor('general')}
              field={'general'}
              title={'General requirements'}
              value={this.currentForm.general}
            />

          </div>
        </form>

        <div className="step-buttons-check">

          <a className={`button`}
             id="cancel"
            onClick={this.redirectToDefaultPage}
          >
            Cancel
          </a>

          <a className={`button`}
             id="decline"
            onClick={() => this.closePosition()}
          >
            Close
          </a>

          <a className={`button`}
             id="approve"
             onClick={() => this.createPosition()}
          >
            Open
          </a>
        </div>

        {/*<div className="history">*/}
          {/*<ul>*/}
            {/*<li>*/}
              {/*<div className='date'>5/04/2018</div>*/}
              {/*<div className='desc'>Position created</div>*/}
            {/*</li>*/}
          {/*</ul>*/}
        {/*</div>*/}

        {this.showSomethingError &&
        <AlertPopup
          title={'File upload process has not finished yet'}
          customDescription={
            <p>
              Note that incomplete uploads will be ceased.
            </p>}
          isSingleOption={false}
          actionClicked={() => this.something()}
          actionTitle={'Yes'}
          cancelTitle={'Cancel'}
          cancelClicked={() => this.showHidePopup(false)}
        />}

      </div>
    )
  }

  arrayChangeHandlerForRequirements(event: any, requirementName: string) {

    this.requirementsObj[requirementName] = event.target.value || null

  }

  arrayChangeHandlerForSkills(event: any, skillName: string) {

    this.skillsObj[skillName] = event.target.value || null

  }

  @action
  addNewRequirement() {
    this.requirementCounter++
    let requirement = {
      field: 'requirements',
      requirementName: 'requirements' + this.requirementCounter,
      fieldTitle: 'Requirement '
    }
    this.arrayOfEntitiesRequirement.push(requirement)
  }

  @action
  removeRequirement(index: any, requirementName: string) {
    this.arrayOfEntitiesRequirement.splice(index, 1)
    delete  this.requirementsObj[requirementName]
  }

  @action
  addNewSkill() {
    this.skillCounter++
    let skill = {
      field: 'skills',
      skillName: 'skills' + this.skillCounter,
      fieldTitle: 'Skill '
    }
    this.arrayOfEntitiesSkill.push(skill)
  }

  @action
  removeSkill(index: any, skillName: string) {
    this.arrayOfEntitiesSkill.splice(index, 1)
    delete  this.skillsObj[skillName]
  }

  toPositionsListing = () => {
    this.props.history.push(`/positions`)
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
  positionTypeChanged(type: any) {
    this.chosenPosition = type ? type : null
    this.currentForm.position = type? type.value._id : null
  }

  textChangeHandlerFor = (fieldName: string) => action((event: any) => {
    if (fieldName === 'amount') {
      this.currentForm[fieldName] = event || 0
    } else {
      this.currentForm[fieldName] = event.target.value || null
    }
  })

  showHidePopup = action((show: boolean) => {
    this.showSomethingError = show
  })

  something = action(() => {
    this.showHidePopup(false)
  })

  redirectToDefaultPage = () => {
    this.props.history.push(`/positions`)
  }

  async closePosition() {
    const promise = this.positionService.close(this.props.match.params.id)
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
  }

  async createPosition() {
    const forms = [
      this.positionValidationForm
    ]

    const validationResults = await Promise.all(forms.map(f => f.validate({showErrors: true})))

    const result = validationResults.filter(f => !f.isValid)
    if (result.length) {
      return false
    }

    if (this.arrayOfEntitiesRequirement.length) {
      this.currentForm.requirements = []
      for (let key in this.requirementsObj) {
        this.currentForm.requirements.push(this.requirementsObj[key])
      }
    }

    if (this.arrayOfEntitiesSkill.length) {
      this.currentForm.skills = []
      for (let key in this.skillsObj) {
        this.currentForm.skills.push(this.skillsObj[key])
      }
    }
    const user = this.authService.getCurrentUser()
    this.currentForm.creator = user.email

    this.currentForm.status = 'active'

    const promise = this.isNew ? this.positionService.createPosition(this.currentForm) : this.positionService.update(this.props.match.params.id, this.currentForm)
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
}
