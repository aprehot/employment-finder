/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');
const { Categories } = require('./models/user-categories');
const { auth } = require('./middlewares/auth');


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
const folderRoutes = require('./middlewares/routes/folders');

app.use('/folders', folderRoutes);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// // VERIFIES USER AUTH ON PAGE ROUTE //
// app.get('/api/auth', auth, (req, res) => {
//   res.json({
//     isAuth: true,
//     id: req.user._id,
//     email: req.user.email,
//     firstname: req.user.firstname,
//     lastname: req.user.lastname,
//     accountType: req.user.accountType,
//     busPhone: req.user.busPhone
//   });
// });
// GET //
// app.get('/api/getFolder', (req, res) => {
//   const id = req.query.id;
//
//   Folders.findById(id, (err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.send(doc);
//   });
// });
//
//
// // LOGOUT //
//
// app.get('/api/logout', auth, (req, res) => {
//   req.user.deleteToken(req.token, (err, user) => {
//     if (err) return res.status(400).send(err);
//     res.sendStatus(200);
//   });
// });
//
//
// // RETRIEVES ALL PROJECTS //
//
// app.get('/api/folders', (req, res) => {
//   // localhost:3001/api/projects?skip=3&limit=2&order=asc
//   const { skip } = parseInt(req.query);
//   const { limit } = parseInt(req.query);
//   const { order } = req.query;
//
//   // ORDER = asc || desc
//   Categories.find().skip(skip).sort({ _id: order }).limit(limit)
//     .exec((err, doc) => {
//       if (err) return res.status(400).send(err);
//       res.send(doc);
//     });
// });
//
//
// // TAKES ALL USERS ON DATABASE //
//
// app.get('/api/users', (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(users);
//   });
// });
//
//
// // REQUIRES OWNER ID //
//
// app.get('/api/user_posts', (req, res) => {
//   Categories.find({ ownerId: req.query.user }).exec((err, docs) => {
//     if (err) return res.status(400).send(err);
//     res.send(docs);
//   });
// });
//
// // POST //
// app.post('/api/categories', (req, res) => {
//   const categories = new Categories(req.body);
//
//   categories.save((err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({
//       categories: true,
//       categoryId: doc._id
//     });
//   });
// });
//
// // REGISTER //
//
// app.post('/api/register', (req, res) => {
//   const user = new User(req.body);
//
//   user.save((err, doc) => {
//     if (err) return res.json({ success: false });
//     res.status(200).json({
//       success: true,
//       user: doc
//     });
//   });
// });
//
// // LOGIN //
//
// app.post('/api/login', (req, res) => {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' });
//
//     user.comparePassword(req.body.password, (error, isMatch) => {
//       if (!isMatch) {
//         return res.json({
//           isAuth: false,
//           message: 'Wrong password'
//         });
//       }
//
//       user.generateToken((err, user) => {
//         if (err) return res.status(400).send(err);
//         res.cookie('auth', user.token).json({
//           isAuth: true,
//           id: user._id,
//           email: user.email
//         });
//       });
//     });
//   });
// });
//
// // UPDATE //
//
// app.post('/api/category_update', (req, res) => {
//   Categories.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.json({
//       success: true,
//       doc
//     });
//   });
// });
//
// // GET DATA OF REVIEWER //
//
// app.get('/api/getReviewer', (req, res) => {
//   const { id } = req.query;
//
//   User.findById(id, (err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.json({
//       firstname: doc.name,
//       lastname: doc.lastname
//     });
//   });
// });
//
// // DELETE //
//
// app.delete('/api/delete_folder', (req, res) => {
//   const { id } = req.query;
//
//   Categories.folders.findByIdAndRemove(id, (err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.json(true);
//   });
// });


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
