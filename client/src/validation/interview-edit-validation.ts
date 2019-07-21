import ValidationForm from './mobx-validator'

const interviewEditValidation = () => ValidationForm({
  fields: [
    {
      name: 'email',
      label: 'Email',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'vacancy',
      label: 'Vacancy',
      placeholder: '',
      rules: 'required|string|between:1,255'
    },
    {
      name: 'date',
      label: 'Date',
      placeholder: '',
      rules: 'date'
    },
    {
      name: 'interviewers',
      label: 'Interviewer',
      placeholder: '',
      rules: 'string|between:1,255'
    },
    {
      name: 'interviewer',
      label: 'Interviewer',
      placeholder: '',
      rules: 'required|string|between:1,255'
    }
  ]
})

export default interviewEditValidation
