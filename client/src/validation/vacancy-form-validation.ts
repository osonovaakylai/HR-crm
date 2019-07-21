import ValidationForm from './mobx-validator'

const vacancyFormValidation = () => ValidationForm({
  fields: [
    {
      name: 'tarif',
      label: 'Vacancies rate',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'topic',
      label: 'Topic',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'vacancyName',
      label: 'Vacancies name',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'city',
      label: 'City',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'requirement',
      label: 'Requirement',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'optional',
      label: 'Optional requirements',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'address',
      label: 'Address',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'education',
      label: 'Education',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'schedule',
      label: 'Schedule',
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
      name: 'condition',
      label: 'Working conditions',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'responsibility',
      label: 'Responsibility',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'other',
      label: 'Other',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'salary',
      label: 'Salary',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'employmentType',
      label: 'Тип занятости',
      placeholder: '',
      rules: 'required|string|between:1,255'
    }
    // {
    //   name: 'socialMedia',
    //   label: 'Type of employment',
    //   placeholder: '',
    //   rules: 'required|string|between:1,255'
    // },
  ]
})

export default vacancyFormValidation
