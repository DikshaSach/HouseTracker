
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const {HouseLog} = require('../models/houses.js');
const passport = require('passport');

router.get('/', function(req, res) {
    HouseLog
        .find()
        .then(logs => {
            res.json(logs);
        });
});

router.get('/:id', function(req, res) {
    HouseLog
        .find({creator: req.params.id})
        .exec()
        .then(logs => {
            res.json(logs)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went horribly awry'});
        });
});

router.post('/', jsonParser, function(req, res){
    const requiredFields = ['name', 'creator', 'location', 'price'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }


    HouseLog
        .create({
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            creator: req.body.creator

        }).then(log => res.status(201).json(log))
        .catch(err =>{
            console.error(err);
            res.status(500).json({error:"Somethings wrong"});
        });

});

router.delete('/:id', (req,res) => {
    HouseLog
    .findByIdAndRemove(req.params.id)
    .then(()=> {
    res.status(204).json({message: 'success'});

})
.catch(err =>{
    console.error(err);
    res.status(500).json({error: 'Something went wrong'});
});
});

router.put('/:id', jsonParser, (req, res)=>{
    if(!(req.params.id && req.body.id === req.body.id)){
        res.status(400).json({
            error: 'Request path id and request body id dont match'
        });
    }
    const updated = {};
    const updatableFields = ['name', 'price', 'location'];
    updatableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });
    HouseLog
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatePost =>{
        res.status(204).end()
    }).catch(err =>{
        res.status(500).json({message:'Somethinngs wrong'});
    
    });

});

module.exports = router;