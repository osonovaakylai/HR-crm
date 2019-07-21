export default class POSITION {
  static departmentTypes = class {
    static names: {
      [key: string]: string;
    } = {
      PM: 'Project Management',
      ADMINISTRATION: 'Administration',
      DEVOPS: 'Dev Ops',
      QA: 'QA',
      DEVELOPMENT: 'Development',
      ALL: 'All Department Types'
    }
    static list = ['ALL', 'PM', 'ADMINISTRATION', 'DEVOPS', 'QA', 'DEVELOPMENT']

  }

  static positionNames = class {
    static names: {
      [key: string]: string;
    } = {
      JAVA: 'Java',
      PYTHON: 'Python',
      JS: 'Javascript',
      CSHARP: 'C#',
      ALL: 'All Position Types'
    }
    static list = ['ALL', 'JAVA', 'PYTHON', 'JS', 'CSHARP']

  }

  static levelNames = class {
    static names: {
      [key: string]: string;
    } = {
      RECEIPT: 'Receipt',
      BILL: 'Bill',
      PURCHASE_ORDER: 'Purchase Order',
      INVOICE: 'Invoice',
      OTHER: 'Other',
      ALL: 'All Transaction Types'
    }
    static list = ['ALL', 'RECEIPT', 'BILL', 'PURCHASE_ORDER', 'INVOICE']

  }

  static positionStatus = class {
    static names: {
      [key: string]: any;
    } = {
      ACTIVE: {
        className: 'approved',
        name: 'active'
      },
      CLOSED: {
        className: 'declined',
        name: 'closed'
      },
    }
  }
}