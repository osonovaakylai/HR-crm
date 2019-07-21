import ValidationForm from './mobx-validator'

const candidatesProfileValidation = () => ValidationForm({
  fields: [
    {
      name: 'firstname',
      label: 'Firstname',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'lastname',
      label: 'Lastname',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: '',
      rules: 'email|required'
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      placeholder: '',
      rules: 'numeric'
    },
    {
      name: 'skype',
      label: 'Skype',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'department',
      label: 'Department',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'experience',
      label: 'Experience',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'level',
      label: 'Level',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'status',
      label: 'Status',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'comment',
      label: 'Comment',
      placeholder: '',
      rules: 'string|between:1,255'
    },
  ]
})

export default candidatesProfileValidation
