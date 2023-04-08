const express = require('express')
const { StatusCodes } = require('http-status-codes')
const cors = require('cors')

const AppError = require('./utils/appError')
const errorHandler = require('./controllers/errorsController')
const userRouter = require('./routes/userRouter')
const placesRouter = require('./routes/placesRouter')
const commentsRouter = require('./routes/commentsRouter')
const repliesRouter = require('./routes/repliesRouter')
const followersRouter = require('./routes/followersRouter')
const alertsRouter = require('./routes/alertsRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/authentication', userRouter)
app.use('/api/v1/places', placesRouter)
app.use('/api/v1/comments', commentsRouter)
app.use('/api/v1/reply', repliesRouter)
app.use('/api/v1/follow', followersRouter)
app.use('/api/v1/alerts', alertsRouter)

app.use('*', (req, res, next) => {
  return next(new AppError(`Could not find ${req.originalUrl}`, StatusCodes.NOT_FOUND))
})

// global error handler
app.use(errorHandler)

module.exports = app

// const str = '@[jeeto gill](2) @[bala kang](1) @[prince kang](1) look here'

// let users = []
// for (let i = 0; i < str.length; i++) {
//   if (str[i] === '@') {
//     const newStr = str.slice(i + 2)
//     const indexBr = newStr.indexOf(']')
//     const newnewstr = newStr.slice(0, indexBr)
//     users.push(newnewstr)
//   }
// }

// console.log(users)

// const arr = str.split(/@\[|]/g).join('')
// console.log(arr)

// let newStr = arr
// users.map(user => {
//   // newStr = newStr.replace(user, 'oooo')
//   // arr.indexOf(user)
//   console.log(arr.indexOf(user))
// })

// // let comment = '%{10}% Hello world %{5}% %{6}%'
// // const getUserName = (id) => {
// //   //test data
// //   //later it comes from the database
// //   if (id == 10) {
// //     return "John";
// //   } else if (id ==5) {
// //     return "Peter";
// //   } else if (id == 6) {
// //     return "Mary";
// //   }
// // };

// // const getUserID = (strId) => {
// //   const id = strId.split('%{')[1].split('}')[0];
// //   return id;
// // }

// // const ids = comment.match(/%{\d+}%/g).map(strID => getUserID(strID));
// // console.log(ids); // [ '10', '5', '6']

// // for (let i = 0; i < ids.length; i++) {
// //   const re = new RegExp(`\\%\\{${ids[i]}\\}\\%`);
// //   comment = comment.replace(re, '@' + getUserName(ids[i]));
// // }

// // console.log(comment); // @John Hello world @Peter @Mary
