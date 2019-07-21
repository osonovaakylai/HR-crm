import * as React from 'react'
import {observer} from 'mobx-react'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import {Link} from 'react-router-dom'

import HeaderWithAlerts from '../header/index'

interface Props {
  history: any
}

@observer
export default class AlertHeaderView extends React.Component<Props, {}> {

  componentWillMount() {

  }

  render() {
    return <HeaderWithAlerts history={this.props.history}/>
  }
}
