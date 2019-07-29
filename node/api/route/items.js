const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Item = require('../model/item');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload =  multer({ storage: storage });

router.get('/', (req, res, next) => {
    Item.find()
        //.select('_id name images')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                items : docs.map(doc => {
                    return{
                        _id: doc._id,
                        name: doc.name,
                        images: doc.images,
                        url:'http://localhost:3000/items/' +doc._id        
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
});

router.get('/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id)
        //.select('_id name images')
        .exec()
        .then(doc => {
            if(doc){
            res.status(200).json({
                        _id: doc._id,
                        name: doc.name,
                        images: doc.images,
                        url:'http://localhost:3000/items'     
                });}
            else{
                res.status(404).json({
                    message: 'no entry for the id'
                });
            }
            })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
});

router.post('/', upload.array( 'images', 5 ), (req, res, next) => {
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        images: req.files
    });
    item
        .save()
        .then( result => {
            res.status(201).json({
                message: 'Item created',
                createdItem: {
                    _id: result._id,
                    name: result.name,
                    images: result.images
                }
            });
        })
        .catch(err =>  {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;