const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const github = require('./github')

app.use(bodyParser.json())

app.post('/github', (request, response) => {
  const repo = request.body.repository.name
  const number = request.body.number
  const action = request.body.action
  github.handleAction(repo, number, action)
  response.end(`Handled action ${action} from PR #${number} in repo ${repo}`)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Error starting server', err)
  }

  console.log(`devops server listening on ${port}`)
})
