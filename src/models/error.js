export default class Error {
  constructor (message = '', httpCode = 500) {
    this.message = message
    this.httpCode = httpCode
  }
}
