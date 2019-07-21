import * as React from 'react'
import {observer} from 'mobx-react'
import ResumeLinePanel from './panels/resume-line-panel'
import LanguagePiePanel from './panels/language-pie-panel'
import TotalsPanel from './panels/totals-panel'

interface Props {
  history: any
}

@observer
export default class StatisticsView extends React.Component<Props, {}> {

  constructor(props: any) {
    super(props)
  }

  componentWillMount() {
    document.title = 'Statistics'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  componentDidMount() {
    this.initLoad()
  }

  initLoad() {
    this.removeLoader()
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

  removeAnimation = () => {
    const base = document.getElementById('base-view')
    if (base && base.classList.contains('animated-view')) {
      base.classList.remove('animated-view')
    }
  }

  render() {
    return (
      <div className="content dashboard-content">
        <section className="listing-title">
          <p className="size36 semibold">Statistics</p>
          <p className="size36 semibold mob">Statistics</p>
        </section>
          <div className="dashboard-wrapper">
            <TotalsPanel/>
            <div className="dashboard-line">
                <ResumeLinePanel/>
                <LanguagePiePanel/>
            </div>
          </div>

      </div>
    )
  }
}
