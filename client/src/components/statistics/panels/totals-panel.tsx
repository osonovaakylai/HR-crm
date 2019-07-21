import * as React from 'react'
import {observer} from 'mobx-react'
import {StatisticsService} from '../../../services'
import {instanceRegistry} from '../../../common/annotations/common'
import {StatisticsMapper} from '../../../mappers'
import {observable, runInAction} from "mobx";

interface Props {
}

@observer
export default class Index extends React.Component<Props, {}> {
  private statisticsService: StatisticsService = instanceRegistry.get('StatisticsService')
  private statisticsMapper: StatisticsMapper = instanceRegistry.get('StatisticsMapper')

  constructor(props: any) {
    super(props)
  }

  async componentWillMount() {
    await this.statisticsService.totals()
  }

  render() {

    const docs = this.statisticsMapper.totals

    return (
      <div className="totals-block">
        <div className="dashboard-card dashboard-card-totals">
          <div className="totals-card">
            <div className="totals-card-block color1">
              <div className="img-container">
                <img src={require('../../../img/statistics/interview.png')} alt="icons"/>
              </div>
              </div>
            <div className="totals-card-text">
              <h3>Conducted <br/>interviews</h3>
              <h2>{docs.interviews}</h2>
            </div>
          </div>

          <div className="totals-card">
            <div className="totals-card-block color2">
              <div className="img-container">
                <img src={require('../../../img/statistics/tel-interview.png')} alt="icons"/>
              </div>

            </div>
            <div className="totals-card-text">
              <h3>Telephone <br/>interviews</h3>
              <h2>{docs.telInterviews}</h2>
            </div>
          </div>

        </div>
        <div className="dashboard-card dashboard-card-totals">
          <div className="totals-card">
            <div className="totals-card-block color3">
              <div className="img-container">
                <img src={require('../../../img/statistics/hired.png')} alt="icons"/>
              </div>

            </div>
            <div className="totals-card-text">
              <h3>Recruited</h3>
              <h2>{docs.hired}</h2>
            </div>
          </div>
          <div className="totals-card">
            <div className="totals-card-block color4">
              <div className="img-container">
                <img src={require('../../../img/statistics/cv.png')} alt="icons"/>
              </div>

            </div>
            <div className="totals-card-text">
              <h3>Total CV</h3>
              <h2>{docs.totalCV}</h2>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
