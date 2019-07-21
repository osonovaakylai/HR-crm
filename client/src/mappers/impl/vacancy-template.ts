import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {VacancyTemplateStore} from '../../stores/index'
import {VacancyTemplateMapper} from '../index'
import {computed} from 'mobx'
import VacancyTemplateModel from '../../models/vacancy-template'

@injectable('VacancyTemplateMapper')
export default class DefaultVacancyTemplateMapper implements VacancyTemplateMapper {
  constructor(@injectOnProperty('VacancyTemplateStore') protected store: VacancyTemplateStore) {

  }

  @computed
  get template() {
    const result = this.store.get('template').result
    return result ? result : VacancyTemplateModel.of({
      'description': 'В дружной команде Zensoft для работы над интересными проектами будем рады видеть “DevOps Engineer”\n' +
      '\n' +
      'Требования:\n' +
      '• Опыт автоматизации операционных процессов;\n' +
      '• Понимание процессов разработки и понятия DevOps;\n' +
      '• Понимание ip-сетей, сетевых протоколов;\n' +
      '• Глубокие знания ОС Lunix;\n' +
      '• Знание скриптовых языков для повседневных задач (bash|python|perl);\n' +
      '• Опыт работы с одним из перечисленных инструментов — Puppet, Chef, Ansible и им подобные;\n' +
      '• Опыт работы с инструментами отладки, мониторинга, сбора метрик и их анализа.\n' +
      '\n' +
      'Опциональные требования:\n' +
      '• Опыт работы с системами контейнерезации Docker,LXC — большой плюс;\n' +
      '• Опыт работы с системами Continious Integration (Jenkins, Gitlab-CI, Teamcity) — большой плюс;\n' +
      '• Опыт работы с AWS — большой плюс;\n' +
      '• Опыт работы с git;\n' +
      '• Опыт работы с системами виртуализации OpenVZ, KVM, Xen, VMWare ESXi, VirtualBox;\n' +
      '• Опыт работы с PostgreSQL;\n' +
      '• Опыт работы с JVM;\n' +
      '• Опыт работы с Redis;\n' +
      '• Опыт работы с ActiveMQ;\n' +
      '• Опыт работы с Nginx, Tomcat.\n' +
      '\n' +
      'Обязанности:\n' +
      '• Развертывание поставленного разработчиками релиза в производстве;\n' +
      '• Интеграция и углубление процессов разработки в поставку;\n' +
      '• Стандартизация окружения разработки;\n' +
      '• Настройка инфраструктуры на особенности разрабатываемого ПО;\n' +
      '• Подготовка продуктивной среды к частым внесениям изменений;\n' +
      '• Обнаружение и исправление проблем;\n' +
      '• Автоматизация процессов.\n' +
      '\n' +
      'Вилка заработной платы для DevOps Engineer: $400 - $800\n' +
      '\n' +
      'Условия работы:\n' +
      '• работа в комфортном современном офисе в центре города,\n' +
      '• руководство, готовое поддерживать вас и помогать в развитии,\n' +
      '• разнообразные проекты,\n' +
      '• корпоративные вечеринки и совместный отдых,\n' +
      '• приятные бонусы и премии,\n' +
      '• своевременную оплату труда,\n' +
      '• удобный график работы,\n' +
      '• официальное трудоустройство.\n' +
      '\n' +
      '📩Резюме присылать на почту: jobs@zensoft.kg ❗В теме обязательно укажите позицию, на которую претендуете: "DevOps Engineer"',
    })
  }
}
