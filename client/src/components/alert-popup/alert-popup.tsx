import * as React from 'react'
import {observer} from 'mobx-react'

interface Props {
  title: string
  description?: string
  customDescription?: any
  isSingleOption?: boolean
  cancelTitle?: string
  cancelClicked?: (e: any) => void
  cancelLink?: string
  cancelTarget?: string
  cancelId?: string
  actionTitle?: string
  actionClicked?: (e: any) => void
  actionLink?: string
  actionTarget?: string
  actionId?: string
}

const AlertPopup = observer((props: Props) => {
  return <section className={`alert-popup open`}>
    <div className="popup-block">
      <div className="popup-info">
        <h1>{props.title}</h1>

        {props.description &&
        <p> {props.description} </p>}
        {props.customDescription}
      </div>
      <div className={ `button-container ${props.isSingleOption ? 'center' : ''}` }>
        { props.cancelTitle  &&
        <a className="button black-line active"
           onClick={props.cancelClicked}
           href={props.cancelLink}
           target={props.cancelTarget}
           id={props.cancelId}> {props.cancelTitle} </a> }

        { props.actionTitle &&
        <a className="button black"
           onClick={props.actionClicked}
           href={props.actionLink}
           target={props.actionTarget}
           id={props.actionId} > {props.actionTitle} </a> }
      </div>
    </div>
  </section>
})

export default AlertPopup


