import * as React from 'react'
import {observer} from 'mobx-react'

import PieChart from '../charts/pie-chart'
import Loader from '../../loader'
import {StatisticsService} from '../../../services'
import {instanceRegistry} from '../../../common/annotations/common'
import {StatisticsMapper} from '../../../mappers'

import {
  observable,
  runInAction
} from 'mobx'

interface Props {
}

@observer
export default class Index extends React.Component<Props, {}> {
  private statisticsService: StatisticsService = instanceRegistry.get('StatisticsService')
  private statisticsMapper: StatisticsMapper = instanceRegistry.get('StatisticsMapper')

  constructor(props: any) {
    super(props)
  }

  @observable
  private hasData: boolean = false

  @observable
  private labelsOfDates: any[]

  @observable
  private uniqDates: any[]

  async componentDidMount() {
    await this.initLoad()
  }

  async initLoad () {
    await this.statisticsService.languagePie()

    runInAction(() => {

      if (this.statisticsMapper.languagePie) {
        this.hasData = true
      }
    })
  }

  render() {
    const data = this.statisticsMapper.languagePie

    return (
      <div
        className={`dashboard-card dashboard-card-cash-snapshot ${!(this.hasData && data.length) ? 'oops-card' : ''}`}>
        <h2>Resumes</h2>
        {this.hasData ?
          data.length ?
            <div>
              <PieChart values={data}/>
            </div>
            :
            <div>
              <p>Oops! Seems like you do not have any data to show.</p>
            </div>
          : < Loader/>}
      </div>

    )
  }
}
