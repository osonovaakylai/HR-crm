import ValidationForm from './mobx-validator'

const positionEditValidation = () => ValidationForm({
  fields: [
    {
      name: 'department',
      label: 'Отдел',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'amount',
      label: 'Количество',
      placeholder: '',
      rules: ''
    },
    {
      name: 'position',
      label: 'Название позиции',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'requirements',
      label: 'Требования',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'requirement',
      label: 'Требования',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'skills',
      label: 'Навыки',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'skill',
      label: 'Навыки',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'level',
      label: 'Уровень',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'general',
      label: 'Общие требования',
      placeholder: '',
      rules: 'string|between:1,1255'
    },
  ]
})

export default positionEditValidation
