const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Categories } = require('./models/user-categories');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());


// VERIFIES USER AUTH ON PAGE ROUTE //
app.get('/api/auth', auth,(req,res)=>{
  res.json({
    isAuth:true,
    id:req.user._id,
    email:req.user.email,
    firstname:req.user.firstname,
    lastname:req.user.lastname,
    accountType: req.user.accountType
  })
})


// GET //
app.get('/api/getFolder', (req,res)=>{
  let id = req.query.id;

  Categories.folders.findById(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc)
  })
})


// LOGOUT //

app.get('/api/logout',auth,(req,res)=>{
  req.user.deleteToken(req.token, (err,user)=>{
    if(err) return res.status(400).send(err);
    res.sendStatus(200)
  })
})


// RETRIEVES ALL PROJECTS //

app.get('/api/folders',(req,res)=>{
  // localhost:3001/api/projects?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Categories.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc)
  })
})


// TAKES ALL USERS ON DATABASE //

app.get('/api/users',(req,res)=>{
  User.find({},(err,users)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(users)
  })
})


// REQUIRES OWNER ID //

app.get('/api/user_posts',(req,res)=>{
    Categories.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// POST //
app.post('/api/categories',(req,res)=>{
  const categories = new Categories(req.body)

  categories.save((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({
      categories:true,
      categoryId:doc._id
    })
  })
})

// REGISTER //

app.post('/api/register',(req,res)=>{
  const user = new User(req.body);

  user.save((err,doc)=>{
    if(err) return res.json({success:false});
    res.status(200).json({
      success:true,
      user:doc
    })
  })
})

// LOGIN //

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE //

app.post('/api/category_update',(req,res)=>{
  Categories.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json({
      success:true,
      doc
    })
  })
})

// GET DATA OF REVIEWER //

app.get('/api/getReviewer',(req,res)=>{
  let id = req.query.id;

  User.findById(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json({
      firstname: doc.name,
      lastname: doc.lastname
    })
  })
})

// DELETE //

app.delete('/api/delete_folder', (req,res)=>{
  let id = req.query.id;

  Categories.folders.findByIdAndRemove(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json(true)
  })
})


const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log('SERVER RUNNING')
})
