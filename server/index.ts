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
// import * as mongoose from 'mongoose';
const config = require('./config/config').get(process.env.NODE_ENV);
const multer = require('multer');

// interface IMult {
// function: (cb?: (action: any) => void, req?: any, file?: any) => void
// }


const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, './uploads/');
  },
  filename(req: any, file: any, cb: any) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

mongoose.connect(config.DATABASE);
// mongoose.Promise = global.Promise;
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


app.use((req: any, res: any, next: any) => {
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

app.post('/api/login', (req: any, res: any) => {
  User.findOne({ email: req.body.email }, (err: any, user: any) => {
    if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' });

    user.comparePassword(req.body.password, (error: any, isMatch: any) => {
      if (!isMatch) {
        return res.json({
          isAuth: false,
          message: 'Wrong password'
        });
      }

      user.generateToken((err: any, user: any) => {
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

// VERIFIES USER AUTH ON PAGE ROUTE //
app.get('/api/auth', auth, (req: any, res: any) => {
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
app.get('/api/user_updates', (req: any, res: any) => {
  Updates.find()
    .select('_id text time image')
    .exec()
    .then((docs: any) => {
      const response = {
        staticFeed: docs.map((doc: any) => ({
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
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// LOGOUT //

app.get('/api/logout', auth, (req: any, res: any) => {
  req.user.deleteToken(req.token, (err: any, user: any) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});



// TAKES ALL USERS ON DATABASE //

app.get('/api/users', (req: any, res: any) => {
  User.find({}, (err: any, users: any) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});



// POST USERUPDATE //
app.post('/api/user_updates', upload.single('image'), (req: any, res: any) => {
  const updates = new Updates({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    time: req.body.time,
    image: req.file.path
  });
  updates
    .save()
    .then((result: any) => {
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
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// REGISTER //

app.post('/api/register', (req: any, res: any) => {
  const user = new User(req.body);

  user.save((err: any, doc: any) => {
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
app.listen(port, host, (err: any) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
