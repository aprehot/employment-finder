/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');
const app = express();

// const config = require('./config/config').get(process.env.NODE_ENV);
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DATABASE);
// app.use(bodyParser.json());
// app.use(cookieParser());
//
// const { User } = require('./models/user');


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);


// app.get('/api/users',(req,res)=>{
//   User.find({},(err,users)=>{
//     if(err) return res.status(400).send(err);
//     res.status(200).send(users)
//   })
// })


// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
