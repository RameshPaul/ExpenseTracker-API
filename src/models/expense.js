export default class Expense {
  constructor (type, recipient, description, amount, currency, date, proof) {
    this.type = type
    this.recipient = recipient
    this.description = description
    this.amount = amount
    this.currency = currency
    this.date = date
    this.proof = proof
  }

  toArray () {
    return [
      this.type,
      this.recipient,
      this.description,
      this.amount,
      this.currency,
      this.date,
      this.proof
    ]
  }
}

export const TYPES = ['TRANSPORT', 'ACCOMMODATION', 'EATING', 'OTHER']
