import * as React from 'react'
import {observer} from 'mobx-react'
import InputMask from 'react-input-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
const MaskedInput: any = require('react-text-mask').default

interface Props {
  id?: string
  onChange?: (event: any) => void
  placeholder?: string
  form?: any
  field?: string
  value?: string | number | null
  disabled?: boolean
  mask?: string
  isCurrency?: boolean
  boldInput?: boolean
  rightAlign?: boolean
  hasCustomError?: boolean
  maxLength?: number
}

const onChangeHandler = (props: Props, bindings: any) => (event: any) => {
  props.onChange && props.onChange(event)
  bindings && bindings.onChange(event)
}

const DefaultInput = observer((props: Props) => {
  const {form, field} = props

  if (form ? !field : field) { // xor
    throw new Error('One of properties "field" and "form" is undefined.' +
      ' Validated input requires both "form" and "field" properties')
  }

  const bindings = form && form.$(field)
                               .bind()

  if (props.isCurrency) {
    return <MaskedInput
      {...bindings}
      id={props.id}
      mask={createNumberMask({
        prefix: '$',
        allowDecimal: true
      })}
      disabled={props.disabled}
      className={`${(form && form.errors()[field!]) || props.hasCustomError ? 'has-error' : ''} ${props.boldInput ? 'semibold' : ''}  ${props.rightAlign ? 'rightAlign' : ''}`}
      placeholder={props.placeholder}
      value={props.value === undefined ? props.value : (props.value || '')}
      onChange={onChangeHandler(props, bindings)}
    />
  }

  if (props.mask) {
    return <InputMask
      {...bindings}
      className={`${(form && form.errors()[field!]) || props.hasCustomError ? 'has-error' : ''} ${props.boldInput ? 'semibold' : ''} ${props.rightAlign ? 'rightAlign' : ''}`}
      type="text"
      id={props.field}
      mask={props.mask}
      maskChar=''
      placeholder={props.placeholder}
      value={props.value === undefined ? props.value : (props.value || '')}
      onChange={onChangeHandler(props, bindings)}/>
  }

  return  <input
    {...bindings}
    id={props.id}
    disabled={props.disabled}
    className={`${(form && form.errors()[field!]) || props.hasCustomError ? 'has-error' : ''} ${props.boldInput ? 'semibold' : ''}  ${props.rightAlign ? 'rightAlign' : ''}`}
    placeholder={props.placeholder}
    value={props.value === undefined ? props.value : (props.value || '')}
    onChange={onChangeHandler(props, bindings)}
    maxLength={props.maxLength}
  />
})

export default DefaultInput
