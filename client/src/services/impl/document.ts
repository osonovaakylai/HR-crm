import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {
  injectable,
  injectOnMethod, instanceRegistry
} from '../../common/annotations/common'
import {AuthService, DocumentService} from '../index'
import {Fetcher} from '../../fetchers/index'
import {observable, runInAction} from "mobx";

export interface FileResult {
  file: File
  progress: number
  uploadedFileName?: string
  uploadedId?: string
}

@injectable('DocumentService')
export default class DefaultDocumentService extends BaseService implements DocumentService {

  fetcher: Fetcher
  headers: any

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async upload(file: FileResult, onProgress: (e: any) => void): Promise<FileResult> {
    const id = await this.uploadWithProgress(Pathes.Attachments.upload, file, onProgress)

    console.log('UPLOADED FILE', file.file.name)
    console.log('UPLOAD RESPONDED', id)
    file.uploadedId = id
    return file
  }

  async uploadOnCreate(file: FileResult): Promise<FileResult> {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if(jwtToken || jwtToken !== '') {
      this.headers = this.fetcher.headers()
      const id = await this.uploadWithProgress(Pathes.Attachments.attachmentUpload, file, () => {})

      console.log('UPLOADED FILE', file.file.name)
      console.log('UPLOAD RESPONDED', id)

      file.uploadedId = id
      file.uploadedFileName = file.file.name
      return file
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  private uploadWithProgress(url: string, fileResult: FileResult, onProgress: (e: any) => void): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      let jwtToken = sessionStorage.getItem('jwtToken')

      const data = new FormData()
      data.append('file', fileResult.file)

      const xhr = new XMLHttpRequest()

      xhr.open('post', url)
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest')
      xhr.setRequestHeader('x-access-token', jwtToken ? jwtToken : 'XMLHttpRequest')

      xhr.withCredentials = true

      // @ts-ignore
      xhr.onload = e => resolve(JSON.parse(e.target.responseText).id)
      xhr.onerror = reject
      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = onProgress
      }

      xhr.send(data)
    })
  }
}
