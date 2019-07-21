import * as React from 'react'
import {observer} from 'mobx-react'
// import 'chartjs-plugin-labels'
import {Pie} from 'react-chartjs-2'
import mobx = require('mobx');
import moment = require('moment')

import {
  observable,
  runInAction
} from 'mobx'
import {DATE_FORMAT} from "../../../dicts/constants";

const options = {
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
    borderWidth: 0.5
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  },
  maintainAspectRatio: true,
  responsive: true,
  legend: {
    display: false
  },
  plugins: {
    labels: [{
      render: function (args: any) {
        return args.label + ' - ' + args.percentage + '%'
      },
      fontColor: '#000',
      position: 'outside',
      fontSize: 14,
      textMargin: 5,
      overlap: true
    }]
  }
}

interface Props {
  values: any
}

@observer
export default class PieChart extends React.Component<Props, {}> {

  @observable
  private data: any

  @observable
  private namesValues: any

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

  loadData() {
    const nameArray = this.props.values.map((el: any) => {
      return moment(el.key).format(DATE_FORMAT)
    })

    const scoreArray = this.props.values.map((el: any) => {
      return el.value
    })

    const negativeBackgroundColors = [
      'rgb(247, 220, 111)',
      'rgb(183, 149, 11)',
      'rgb(241, 196, 15)',
      'rgb(243, 156, 18)',
      'rgb(211, 84, 0)'
    ]

    const positiveBackgroundColor = [
      'rgba(250, 215, 160)',
      'rgba(248, 196, 113)',
      'rgb(245, 176, 65)',
      'rgba(243, 156, 18)',
      'rgb(214, 137, 16)',
      'rgb(185, 119, 14)'
    ]

    let backgroundColors: any[] = []

    for (let i = 0; i < scoreArray.length; i++) {
      const value = scoreArray[i]
      value < 0 ? backgroundColors.push(negativeBackgroundColors[i]) : backgroundColors.push(positiveBackgroundColor[i])
    }

    const positiveValues = scoreArray.map((el: number) => {
      return Math.abs(el)
    })

    const namesValues = nameArray.map((name: any) => {
      const index = nameArray.indexOf(name)
      return {
        name: name,
        value: positiveValues[index],
        color: backgroundColors[index]
      }
    })

    const data = {
      labels: nameArray,
      datasets: [
        {
          data: positiveValues,
          backgroundColor: backgroundColors
        }
      ]
    }

    runInAction(() => {
      this.data = data
      this.namesValues = namesValues
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    runInAction(() => {
      this.isMobile = window.innerWidth <= 719
    })
  }

  render() {

    return (
      <div className="chart-wrapper">
        <div className="income-breakout-wrapper">
          <div className="pie-canvas">
            <Pie
              data={this.data ? mobx.toJS(this.data) : {}}
              options={options}
              height={40}
              width={50}
            />
          </div>
          <div className="marker-group-income-breakout">
            <div className="items">
              {this.namesValues && this.namesValues.map((el: any) =>
                <li key={el.name} className="marker-group-item">
                  <div className="marker" style={{background: `${el.color}`}}></div>
                  <span>{el.name}: {el.value}</span>
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
