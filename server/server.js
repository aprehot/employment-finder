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
const { Folders } = require('./models/user-folders');
const { Project } = require('./models/project');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //
app.get('/api/getProject', (req,res)=>{
  let id = req.query.id;

  Project.findById(id,(err,doc)=>{
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

app.get('/api/projects',(req,res)=>{
  // localhost:3001/api/projects?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Project.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
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
    Project.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// POST //
app.post('/api/project',(req,res)=>{
  const project = new Project(req.body)

  project.save((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({
      project:true,
      projectId:doc._id
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

app.post('/api/project_update',(req,res)=>{
  Project.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc)=>{
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
      name: doc.name,
      lastname: doc.lastname
    })
  })
})

// DELETE //

app.delete('/api/delete_project', (req,res)=>{
  let id = req.query.id;

  Project.findByIdAndRemove(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json(true)
  })
})


const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log('SERVER RUNNING')
})
