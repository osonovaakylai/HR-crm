import * as React from 'react'
import SendMessageForm from '../../components/hr/send-message-form'
import RestrictedScene from '../RestrictedScene/index'
import {PERMISSION_TYPES} from '../../dicts/roles-and-permissions'

interface Props {
  history: History
  location: any
  match: any
}

export class MessageScene extends React.Component<Props, {}> {
  componentWillMount() {
    document.title = 'Message'
  }

  render() {
    return (
      <RestrictedScene component={SendMessageForm}
                       history={this.props.history}
                       requiredPermissions={[PERMISSION_TYPES.manageSendMessageView]}
      />
    )
  }
}
