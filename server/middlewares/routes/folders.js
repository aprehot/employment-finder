const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


const Folders = require('../../models/user-folders');

// retrieve all from specific owner

router.get('/user_folders', (req, res, next) => {
  Folders.find({
    ownerId: req.query.ownerId
  })
    .exec()
    .then((docs) => {
      const response = {
        folders: docs.map((doc) => ({
          ownerId: doc.ownerId,
          folderName: doc.folderName,
          category: doc.category,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/folders/${doc._id}`
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


// POST A FOLDER to a specific owner//

router.post('/', (req, res, next) => {
  const folders = new Folders({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    ownerId: req.body.ownerId,
    folderName: req.body.folderName
  });
  folders.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /folders',
      createdFolder: {
        ownerId: result.ownerId,
        category: result.category,
        folderName: result.folderName,
        _id: result._id,
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

// UPDATE A FOLDER
router.patch('/:folderId', (req, res, next) => {
  Folders.findByIdAndUpdate(req.params.folderId, req.body).exec().then((result) => {
    if (result) {
      res.status(200).json({ result, message: `Updated folder with id:${req.params.folderId}` });
    } else {
      res.status(404).json({
        message: 'Invalid id'
      });
    }
    console.log(result);
  }).catch((err) => {
    res.status(500).json({ err });
  });
});


// FIND SPECIFIC FOLDER //

router.get('/:folderId', (req, res) => {
  const id = req.params.folderId;

  Folders.findById(id)
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


// UPDATE FOLDERS //
/* eslint no-restricted-syntax: 0 */

// router.patch('/:folderId', (req, res, next) => {
//   const id = req.params.folderId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Folders.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });


// FETCH ALL FOLDERS //

// router.get('/', (req, res) => {
//   // localhost:3001/api/projects?skip=3&limit=2&order=asc
//   const { skip } = parseInt(req.query);
//   const { limit } = parseInt(req.query);
//   const { order } = req.query;
//
//   // ORDER = asc || desc
//   Folders.find().skip(skip).sort({ _id: order }).limit(limit)
//     .exec((err, doc) => {
//       if (err) return res.status(400).send(err);
//       res.send(doc);
//     });
// });

// DELETE FOLDER //

router.delete('/:folderId', (req, res, next) => {
  const id = req.params.folderId;
  Folders.remove({ _id: id }).exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
