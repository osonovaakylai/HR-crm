import ValidationForm from './mobx-validator'

const sendMessageValidationForm = () => ValidationForm({
  fields: [
    {
      name: 'topic',
      label: 'Theme',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'recipients',
      label: 'Recipients',
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
      name: 'link',
      label: 'Link',
      placeholder: '',
      rules: 'url'
    },
  ]
})

export default sendMessageValidationForm
