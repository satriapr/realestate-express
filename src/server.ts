// 'dev': 'tsc -w & nodemon .'

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import passportSetup from './utils/passportSetup'

import Constant from './constants/Constant'


const app = express()
dotenv.config()

const PORT: string | number = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(routes)

// connect mongo
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.is7bh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error
  })


/* Facebook login */

passportSetup()

app.use(
  cookieSession({
    name: 'session',
    keys: [Constant.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize())

// deserialize cookie from the browser
app.use(passport.session())

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up auth routes
app.use('/auth', routes);

const authCheck = (req: Request, res: Response, next: any) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  } else {
    next();
  }
};

app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});

/* End of facebook login */