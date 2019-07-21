import * as React from 'react'
import Select from 'react-select'
import {observer} from 'mobx-react'

interface Props {
  options: Array<any>
  value?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  onChange?: (value: any) => void
  form?: any
  field?: string
  boldInput?: boolean
  isMulti?: boolean
}

const onChangeHandler = (props: Props, form?: any, field?: string) => (value: any) => {
  props.onChange && props.onChange(value)
  form && form.update({[field!]: value})
}

const DefaultSelect = observer((props: Props) => {
  const {form, field} = props

  if (form ? !field : field) { // xor
    throw new Error('One of properties "field" and "form" is undefined.' +
      ' Validated select requires both "form" and "field" properties')
  }

  const bindings = form && form.$(field)
                               .bind()

  return (
    <Select
      {...bindings}
      disabled={props.disabled}
      className={`${form && form.errors()[field!] ? 'has-error' : ''}  ${props.boldInput ? 'semibold' : ''}`}
      placeholder={props.placeholder}
      onChange={onChangeHandler(props, form, field)}
      searchable={true}
      options={props.options}
      value={props.value}
      clearable={props.clearable}
      isMulti={props.isMulti}
    />
  )
})

export default DefaultSelect
