const express = require('express')

const routes = require('./routes')

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})