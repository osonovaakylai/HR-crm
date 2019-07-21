import ValidationForm from './mobx-validator'

const interviewInviteValidation = () => ValidationForm({
  fields: [
    {
      name: 'fullname',
      label: 'Fullname',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'place',
      label: 'Place',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'message',
      label: 'Message',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'datetime',
      label: 'Date',
      placeholder: '',
      rules: 'date'
    }
  ]
})

export default interviewInviteValidation
