export default class Expense {
  constructor (data) {
    this.type = data.type
    this.recipient = data.recipient
    this.description = data.description
    this.amount = data.amount
    this.currency = data.currency
    this.date = data.date
    this.proof = data.proof
  }

  toArray () {
    return [
      this.type,
      this.recipient,
      this.description,
      this.amount,
      this.currency,
      this.date
    ]
  }
}

export const TYPES = ['TRANSPORT', 'ACCOMMODATION', 'EATING', 'OTHER']
