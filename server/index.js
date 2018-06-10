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
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const upload = multer({ storage, limits: {
    fileSize: 1024 * 1024 * 5
}
});

mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise;
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');
const Updates = require('./models/user-updates');
const { auth } = require('./middlewares/auth');


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);


const projectRoutes = require('./middlewares/routes/projects');
const folderRoutes = require('./middlewares/routes/folders');

const Folders = require('./models/user-folders');

app.use('/api/folders', folderRoutes);
app.use('/api/projects', projectRoutes);


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

// LOGIN //

app.post('/api/login', (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' });

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch) {
        return res.json({
          isAuth: false,
          message: 'Wrong password'
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        });
      });
    });
  });
});


// // REQUIRES OWNER ID //
//
// app.get('/api/user_folders', (req, res) => {
//   Folders.find({
//     user: req.query.ownerId,
//     // category: req.query.category
//   }).exec((err, docs) => {
//     if (err) return res.status(400).send(err);
//     res.send(docs);
//   });
// });


// VERIFIES USER AUTH ON PAGE ROUTE //
app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    accountType: req.user.accountType,
    busPhone: req.user.busPhone
  });
});


// RETRIEVE USER SPECIFIC UPDATES //
app.get('/api/user_updates', (req, res) => {
  Updates.find()
    .select('_id text time image')
    .exec()
    .then((docs) => {
      const response = {
        staticFeed: docs.map((doc) => ({
          text: doc.text,
          image: doc.image,
          time: doc.time,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/user_updates/${doc._id}`
          }
        }))
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// LOGOUT //

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

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


// TAKES ALL USERS ON DATABASE //

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});


// REQUIRES OWNER ID //

app.get('/api/user_posts', (req, res) => {
  Categories.find({ ownerId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});


// POST USERUPDATE //
app.post('/api/user_updates', upload.single('image'), (req, res) => {
  console.log(req.file);
  const updates = new Updates({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    time: req.body.time,
    image: req.file.path
  });
  updates
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created feed update successfully',
        createdProduct: {
          text: result.text,
          time: result.time,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/api/user_updates${result._id}`
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// REGISTER //

app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
});
//

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
