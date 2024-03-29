const express = require('express')
const app = express()

const { connectDB } = require('./config/connectDB')
const MongoStore = require('connect-mongo')

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

const bodyParser = require('body-parser')

require('dotenv').config({ path: './.env' })

const routes = require('./routes/mainRoutes.js')
const indexRoutes = require('./routes/index')

async function connect() {
	connectDB()
}
connect()
app.listen(process.env.PORT || 2121, () => {
			console.log(`without callback http://localhost:${process.env.PORT}`)
		})
/**Session configs */
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)

/**Passport + Middleware*/
require('./middleware/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.json())

app.use('/', indexRoutes)
app.use('/api', routes)
