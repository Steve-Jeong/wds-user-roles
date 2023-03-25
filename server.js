const express = require('express')
const app = express()
const { users, ROLE } = require('./data')
const {authUser, authRole} = require('./basicAuth')
const projectRouter = require('./routes/projects')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send('Home Page  '+req.body.name)
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  console.log('setUser')
  console.log('setUser -> before : req.user = ', req.user)
  if (userId) {
    req.user = users.find(user => user.id === userId)
    console.log('req.user : ', req.user);
  }
  console.log('setUser -> after : req.user = ', req.user)
  next()
}

const PORT = 3001

app.listen(PORT, console.log('server is listening on port', PORT))
