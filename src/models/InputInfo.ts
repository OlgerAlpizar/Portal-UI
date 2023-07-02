export class InputInfo {
  valid: boolean
  value: string
  error: string

  constructor(valid = true, value = '', error = '') {
    this.valid = valid
    this.value = value
    this.error = error
  }
}

export type InputInfoSet = {
  value: string
}
