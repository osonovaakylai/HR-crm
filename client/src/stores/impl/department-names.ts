import {DepartmentNamesStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {DepartmentNamesResults} from '../../results'

@injectable('DepartmentNamesStore')
export class DefaultDepartmentNamesStore extends BaseResultStore<DepartmentNamesResults> implements DepartmentNamesStore {

}
