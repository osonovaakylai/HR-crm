import * as validatorjs from 'validatorjs'

const MobxReactForm: any = require('mobx-react-form')
const {Form} = MobxReactForm

const defaultOptions = {
  validateOnInit: false,
  validateOnBlur: true,
  showErrorsOnBlur: true
}

const defaultPlugins = {
  dvr: validatorjs
}

const defaultHooks = {
  onSuccess(form: any) {
    console.log('Validation passed', form)
  },
  onError(form: any) {
    console.log('Validation failed', form.errors())
  }
}

const customPlugin = (requiredError ?: string, sizeError ?: string) => {
  return requiredError ? {
    dvr: {
      package: validatorjs,
      extend: ($validator: any) => {
        var messages = $validator.getMessages('en')
        messages.required = requiredError
        $validator.setMessages('en', messages)
      }
    }
  } : {
    dvr: {
      package: validatorjs,
      extend: ($validator: any) => {
        var messages = $validator.getMessages('en')
        messages.size = sizeError
        $validator.setMessages('en', messages)
      }
    }
  }
}

const ValidationForm = (params: {
  fields: any,
  plugins?: any,
  hooks?: any,
  options?: any,
  requiredError ?: string,
  sizeError ?: string
}) => {
  return new Form({fields: params.fields}, {
    plugins: params.requiredError || params.sizeError ? customPlugin(params.requiredError, params.sizeError) :
      {...defaultPlugins, ...params.plugins},
    hooks: {...defaultHooks, ...params.hooks},
    options: {...defaultOptions, ...params.options}
  })
}

export default ValidationForm