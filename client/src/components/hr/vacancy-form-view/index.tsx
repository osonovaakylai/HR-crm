import * as React from 'react'
import {observer} from 'mobx-react'
import {
  action,
  observable
} from 'mobx'
import TemplateFormView from './template/index'
import VacancyFormView from './general/index'

interface Props {
  history: any
  match: any
}

@observer
export default class VacancyCreateView extends React.Component<Props, {}> {

  @observable
  private requestsActive: boolean = false

  componentWillMount() {
    document.title = 'Companies'
    const ele = document.getElementById('loader')
    if(ele && !ele.classList.contains('load')){
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    await this.initLoad()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {

  }

  showWithAnimation = () => {
    const base = document.getElementById('base-view')
    if(base){
      base.classList.add('animated-view')
    }
  }

  removeLoader = () => {
    const ele = document.getElementById('loader')
    if(ele && ele.classList.contains('load')){
      ele.classList.remove('load')
    }
  }

  render() {
    return (
      <div className="content" id="base-view">
        <section className="listing-title">
          <p className="size36 semibold">Vacancy</p>
          <p className="size36 semibold mob">Vacancy</p>
        </section>

        <div className="listing-tabs">
          <ul className="tabs">
            <li className={`${this.requestsActive && 'active'}`}
                onClick={() => this.changeTab(true)}>
              Template
            </li>
            <li className={`${!this.requestsActive && 'active'}`}
                onClick={() => this.changeTab(false)}>
              General
            </li>
          </ul>
        </div>
        {this.requestsActive ?
          <TemplateFormView history={this.props.history} match={this.props.match} /> :
          <VacancyFormView history={this.props.history} match={this.props.match} /> }
      </div>
    )
  }

  @action
  changeTab(requestsActive: boolean) {
    this.requestsActive = requestsActive
  }
}