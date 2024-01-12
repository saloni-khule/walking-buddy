const express = require('express')
const router = express.Router()
//const walkDetails = require('../models/walkDetailsModel')
const {
    createWalk,
    getWalks,
    getWalk,
    deleteWalk,
    updateWalk
} = require('../controllers/walkDetailsController');
const { create } = require('../models/walkDetailsModel');


//get all walks
router.get('/', getWalks)

//get a walk
router.get('/:id', getWalk)

//post a new walk
router.post('/', createWalk)

//delete a walk
router.delete('/:id', deleteWalk)

//update a walk
router.patch('/:id', updateWalk)




module.exports = router