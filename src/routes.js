import expense from './resources/expense'

export default (app) => {
  app.post('/expense', expense.add)
}
