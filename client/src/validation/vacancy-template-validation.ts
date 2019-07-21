import ValidationForm from './mobx-validator'

const vacancyTemplateValidation = () => ValidationForm({
  fields: [
    {
      name: 'description',
      label: 'Description',
      placeholder: '',
      rules: 'required|string|between:1,255'
    }
  ]
})

export default vacancyTemplateValidation
