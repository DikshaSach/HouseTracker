
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');


const {HouseLog} = require('../houses/models.js');
const passport = require('passport');
const HouseService = require('../service/houseService');

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
            res.status(500).json({error: 'Something went wrong'});
        });
});


router.post('/', jsonParser, async (req, res) =>{
    try{
    let HouseLog = await HouseService.create(req.body);
    res.status(201).json({message: 'House has been created'});
 
   } catch (err) {
     res.status(500).json({message: 'There was a problem creating the house.'});
   }
});

router.delete('/:id', async (req,res) => {
    try{
        
    let HouseLog = await HouseService.remove(req.params.id); 
    res.status(204).json({message: 'success'});

}
catch(err){
   
    res.status(500).json({message: 'Something went wrong'});
}
});

router.put('/:id', jsonParser, async (req, res)=>{
    try{
        let HouseLog = await HouseService.update(req.params.id, req.body);
        res.status(204).json({message: 'House has been updated'});
     
       } catch (err) {
         res.status(500).json({message: 'There was a problem updating.'});
       }

    

});







module.exports = router;