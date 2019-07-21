import * as React from 'react'
import {observer} from 'mobx-react'
import {
  Line,
  Pie
} from 'react-chartjs-2'
import moment = require('moment')
import mobx = require('mobx');
import {DATE_FORMAT} from '../../../dicts/constants'

import {
  action,
  observable,
  runInAction
} from 'mobx'

interface Props {
  values: any
}

const options: any = {
  tooltips: {
    backgroundColor: 'white',
    titleFontFamily: 'Hind',
    titleFontColor: 'black',
    titleFontStyle: 'normal',
    bodyFontFamily: 'Hind',
    bodyFontColor: 'black',
    bodyFontStyle: 'normal',
    cornerRadius: 3,
    borderColor: 'rgba(22,34,41,.2)',
    borderWidth: 0.5,
  },
  maintainAspectRatio: true,
  responsive: true,
  legend: {
    position: 'bottom',
    display: false,
    labels: {
      usePointStyle: true,
      fontSize: 18,
      fontStyle: 'bold',
      fontColor: '#363532',
      fontFamily: 'Hind'
    }
  },
  scales: {
    xAxes: [{
      offset: true,
      gridLines: {
        drawOnChartArea: false,
        color: '#8B9194',
        tickMarkLength: 10,
        fontFamily: 'Hind'
      },
      ticks: {
        lineHeight: 24,
        fontSize: 12,
        padding: 14,
        fontFamily: 'Hind'
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true
      },
      gridLines: {
        drawOnChartArea: false,
        color: '#8B9194',
        tickMarkLength: 10,
        fontFamily: 'Hind',
      },
      ticks: {
        fontSize: 12,
        padding: 14,
        fontFamily: 'Hind'
      }

    }]
  }
}

@observer
export default class LineChart extends React.Component<Props, {}> {

  @observable
  private data: any = {}

  @observable
  private isMobile: boolean = window.innerWidth <= 719

  constructor(props: any) {
    super(props)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  async componentDidMount() {
    await this.loadData()
  }

  handleWindowSizeChange = () => {
    runInAction(() => {
      this.isMobile = window.innerWidth <= 719
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  loadData() {
    this.props.values.sort((a: any, b: any) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))

    const dateArray = this.props.values.map((el: any) => {
      return moment(el.key).format(DATE_FORMAT)
    })

    const scoreArray = this.props.values.map((el: any) => {
      return el.value
    })
    const data = {
      labels: dateArray,
      datasets: [
        {
          data: scoreArray,
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#fff',
          borderColor: 'rgb(249,170,51)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderWidth: 4,
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(249,170,51)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: 'rgb(249,170,51)',
          pointHoverBorderColor: 'rgb(249,170,51)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 5,
          steppedLine: true
        }
      ]
    }

    runInAction(() => {
      this.data = data
    })

  }

  render() {
    return (
      <div className="chart-wrapper">
        <div className="line-canvas">
          <Line
            data={this.data ? mobx.toJS(this.data) : {}}
            options={options}
            height={this.isMobile ? 300 : 500}
            width={this.isMobile ? 370 : 1000}/>

          <div className="marker-group marker-group-cash-snapshot">

              <div>

                <div className="marker" style={{borderColor: `rgb(249,170,51)`}}></div>

                <span>Received resumes in dates</span>
              </div>

          </div>
        </div>
      </div>
    )
  }
}
