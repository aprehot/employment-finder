const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

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

router.get('/folder_projects', (req, res) => {
  Project.find({
    user: req.query.ownerId,
    parentFolder: req.query.parentFolder,
    parentCategory: req.query.parentCategory
  })
    .select('_id ownerId title parentFolder')
    .exec()
    .then((docs) => {
      res.status(200).json({
        projects: docs.map((doc) => ({
          _id: doc._id,
          ownerId: doc.ownerId,
          title: doc.title,
          parentFolder: doc.parentFolder,
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

router.post('/', (req, res, next) => {
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

// FIND A PROJECT THEN MAP IT TO A FOLDER - GIVE A PRODUCT A FOLDER, THEN FIND ALL PRODUCTS WITH THAT FOLDER?
// router.post('/project', (req, res, next) => {
//   Project.findById(req.body.projectId)
//     .then((projects) => {
//       if (!projects) {
//         return res.status(404).json({
//           message: 'Project not found'
//         });
//       }
//       const folder = new Folder({
//         _id: mongoose.Types.ObjectId(),
//         category: req.body.category,
//         ownerId: req.body.ownerId,
//         projects: req.body.projectId
//       });
//       return folder.save();
//     })
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: 'Project stored',
//         createdFolder: {
//           _id: result._id,
//           projects: result.projects,
//           ownerId: result.ownerId,
//           category: result.category
//         },
//         request: {
//           type: 'GET',
//           url: `http://localhost:3000/api/folders/${result._id}`
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// *** WHEN YOU CLICK FOLDER REVEAL THESE PROJECTS ***//
// TODO: .find() method should look for matching owner id
router.get('/', (req, res, next) => {
  Project.find()
    // .select('ownerId folderName _id category')
    .exec()
    .then((docs) => {
      const response = {
        projects: docs.map(() => req.body
        // ({
        //   ownerId: doc.ownerId,
        //   folderName: doc.folderName,
        //   category: doc.category,
        //   _id: doc._id,
        //   request: {
        //     type: 'GET',
        //     url: `http://localhost:3000/folders/${doc._id}`
        //   }
        // })
        )
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

// FIND SPECIFIC FOLDER
router.get('/:projectId', (req, res, next) => {
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

// DELETE FOLDER

router.delete('/:orderId', (req, res, next) => {
  Folder.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Folder deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/orders',
          body: { productId: 'ID', quantity: 'Number' }
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
