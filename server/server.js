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
