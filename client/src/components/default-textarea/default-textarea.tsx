import * as React from 'react'
import {observer} from 'mobx-react'
import Textarea from 'react-textarea-autosize'

interface Props {
  onChange: (event: any) => void
  placeholder?: string
  title: string
  form: any
  field: string
  value?: string
  disabled?: boolean
  mask?: string
  required?: boolean
  customError?: string
  rows?: number
  cols?: number

}

const DefaultTextarea = observer((props: Props) => {
  const errors = props.form.errors()[props.field]
  return  <section className={`input-section` }>
    <p className={`size16 input-name ${props.required ? 'required' : ''} `}>
      {props.title}
    </p>

    <Textarea
      className={`textarea-control size14 `}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      rows={1}
    />

    {typeof errors === 'string' &&
    <p className="size16 invalid">{errors}</p>
    }

  </section>
})

export default DefaultTextarea
