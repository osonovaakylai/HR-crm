import * as React from 'react'
import {observer} from 'mobx-react'
import moment = require('moment')
import {DATE_FORMAT} from '../../dicts/constants'
import {DATE_TIME_FORMAT} from '../../dicts/constants'

import {
  observable
} from 'mobx'

interface Props {
  date: any
  format?: string
  stub?: string
  factor?: number
}

@observer
export default class DateFormat extends React.Component<Props, {}> {

  @observable
  private date: any = this.props.date

  @observable
  private format: string = this.props.format ? this.props.format : DATE_TIME_FORMAT

  constructor(props: any) {
    super(props)
  }

  render() {
    const stub = (this.props.stub || this.props.stub === '') ? this.props.stub : '-'
    return (
      <>
        {this.date ? moment(this.date).format(this.format) : stub}
      </>
    )
  }
}
