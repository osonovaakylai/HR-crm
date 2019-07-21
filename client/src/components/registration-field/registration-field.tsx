import * as React from 'react'

import DefaultInput from '../default-input/default-input'
import {observer} from 'mobx-react'

interface Props {
  form: any
  field: string
  onChange: (e: any) => void
  title: string
  required?: boolean
  value?: string | number | null
  mask?: string
  isCurrency?: boolean
  disabled?: boolean
  boldSection?: boolean
  boldTitle?: boolean
  boldInput?: boolean
  rightAlign?: boolean
  customError?: string
  maxLength?: number
  isInformPopup?: boolean
  informPopupContent?: string
  leftHalfField?: boolean
  rightHalfField?: boolean
  inputSectionHeight?: boolean
  clear?: boolean
}

const RegistrationField = observer((props: Props) => {
  const errors = props.form.errors()[props.field]
  return <section className={`input-section ${props.boldSection ? 'semibold' : ''} ${props.leftHalfField ? 'input-section-left-half ' : ''} ${props.rightHalfField ? 'input-section-right-half ' : ''} ${props.inputSectionHeight ? 'input-section-height' : ''} ${props.clear ? 'clear' : ''} ` }>
    <p className={`size16 input-name ${props.required ? 'required' : ''} ${props.boldTitle ? 'semibold' : ''}`}>
      {props.title}
      {props.isInformPopup && <span className="info-circle"><span className="circle-popup">{props.informPopupContent}</span></span>}
    </p>
    <DefaultInput
      onChange={props.onChange}
      form={props.form}
      field={props.field}
      value={props.value}
      disabled={props.disabled}
      mask={props.mask}
      isCurrency={props.isCurrency}
      boldInput={props.boldInput}
      rightAlign={props.rightAlign}
      hasCustomError={props.customError ? props.customError.length > 0 : false}
      maxLength={props.maxLength}
    />
    {typeof errors === 'string' &&
    <p className="size16 invalid">{errors}</p>}
    {props.customError && props.customError.length &&
    <p className="size16 invalid has-error">{props.customError}</p>}
  </section>
})

export default RegistrationField
