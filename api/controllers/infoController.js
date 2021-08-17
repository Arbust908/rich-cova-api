const fs = require('fs')
const path = require('path')
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/../DB/data/info.json`))
)

const validateToken = (token) => {
  return tokens.includes(token)
}

const tokens = [
  '7ImtNTUmDY',
  'LwBXKjSy7t',
  'eG0xr9Lgd6',
  'U9gENKxgba',
  '8NFduS52JN',
  'kSow0B3bzH',
  'EWC0EYknAZ',
  'cvrUwGWfzJ',
  'USoZ4QnrMm',
  'dYa6zGZOPe',
]

exports.validateID = (req, res, next, token) => {
  const isValid = validateToken(token)
  if (!isValid) {
    return res.status(404).json({
      status: 'failed',
      message: 'Not valid user',
    })
  }
  next()
}

exports.validateCredential = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.secret) {
    return res.status(400).json({
      status: 'failed',
      message: 'Mala info, BRO!',
    })
  }
  const user = getUserByName(req.body.username)
  if (user && validateUser(req.body, user)) {
    res.status(200).json({
      status: 'success',
      reqTime: req.requestTime,
      token: tokens[2],
      user,
    })
  } else {
    return res.status(400).json({
      status: 'failed',
      message: 'Los datos no concuerdan',
    })
  }
}

exports.getAll = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    reqTime: req.requestTime,
    users,
  })
}
exports.getById = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: users.find((tour) => {
      return tour.id === req.params.id
    }),
  })
}
exports.post = (req, res) => {
  const newID = getLast(users).id + 1
  const newTour = Object.assign({ id: newID }, req.body)

  users.push(newTour)
  fs.writeFile(
    path.join(__dirname, `/../DB/data/passports.json`),
    JSON.stringify(users),
    (err) => {
      console.log(err)
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}
exports.patchById = (req, res) => {
  const user = req.body
  let dbUser = {}
  let userIndex = null
  for (let i = 0; i < users.length; i++) {
    const element = users[i]
    if (element.username === user.username) {
      dbUser = element
      userIndex = i
    }
  }

  users[userIndex] = {
    ...dbUser,
    ...user,
  }
  fs.writeFile(
    path.join(__dirname, `/../DB/data/passposrts.json`),
    JSON.stringify(users),
    (err) => {
      console.log(err)
      res.status(201).json({
        status: 'success',
      })
    }
  )
}
exports.deleteById = (req, res) => {
  const newUsers = users.filter((user) => {
    return user.username !== req.body.username
  })
  fs.writeFile(
    path.join(__dirname, `/../DB/data/passports.json`),
    JSON.stringify(newUsers),
    (err) => {
      console.log(err)
      res.status(204).json({
        status: 'success',
        data: null,
      })
    }
  )
}
