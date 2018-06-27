const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
/* eslint no-underscore-dangle: 0 */

// const Folder = require('../../models/user-folders');
const Project = require('../../models/project');

// Handle incoming GET requests to /folders

// router.get('/', (req, res) => {
//   Project.find()
//     .select('ownerId ')
//     .exec()
//     .then((docs) => {
//       res.status(200).json({
//         projects: docs.map((doc) => ({
//           _id: doc._id,
//           category: doc.category,
//           ownerId: doc.ownerId,
//           projects: doc.project,
//           request: {
//             type: 'GET',
//             url: `http://localhost:3000/api/folders/${doc._id}`
//           }
//         }))
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// FIND SPECIFIC FOLDER //

router.get('/folder_projects/:projectId', (req, res) => {
  const id = req.params.projectId;

  Project.findById(id)
    .exec()
    .then((doc) => {
      console.log('From Database', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No Valid Entry Found for Provided ID'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// *** WHEN YOU CLICK FOLDER REVEAL THESE PROJECTS ***//

router.get('/folder_projects', (req, res) => {
  Project.find({
    ownerId: req.query.ownerId,
    parentFolder: req.query.parentFolder,
    parentCategory: req.query.parentCategory
  })
    .select('_id ownerId title parentFolder parentCategory')
    .exec()
    .then((docs) => {
      res.status(200).json({
        projects: docs.map((doc) => ({
          _id: doc._id,
          ownerId: doc.ownerId,
          title: doc.title,
          parentFolder: doc.parentFolder,
          parentCategory: doc.parentCategory,
          request: {
            type: 'GET',
            url: `http://localhost:3000/api/projects/folder_projects/${doc._id}`
          }
        }))
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

// POST A FOLDER to a specific owner//

router.post('/', (req, res) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  project.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /projects',
      createdFolder: {
        ownerId: result.ownerId,
        _id: result._id,
        parentFolder: result.parentFolder,
        title: result.title,
        request: {
          type: 'GET',
          url: `http://localhost:3000/folders/${result._id}`
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


// FIND SPECIFIC FOLDER
router.get('/:projectId', (req, res) => {
  Project.findById(req.params.projectId)
    .exec()
    .then((proj) => {
      if (!proj) {
        return res.status(404).json({
          message: 'Project not found'
        });
      }
      res.status(200).json({
        proj,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/api/project'
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

// DELETE PROJECT

// router.delete('/:orderId', (req, res, next) => {
//   Folder.remove({ _id: req.params.orderId })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: 'Folder deleted',
//         request: {
//           type: 'POST',
//           url: 'http://localhost:3000/orders',
//           body: { productId: 'ID', quantity: 'Number' }
//         }
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;
