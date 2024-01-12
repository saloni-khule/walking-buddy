const walkDetails = require('../models/walkDetailsModel')
const mongoose = require('mongoose')
//get all walks
const getWalks = async (req, res) => {
    const walks = await walkDetails.find({}).sort({ createdAt: -1 });
    res.status(200).json(walks);
}


//get a single walk
const getWalk = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such walk' })
    }

    const walk = await walkDetails.findById(id)
    if (!walk) {
        return res.status(404).json({ error: 'No such walk' })
    }

    res.status(200).json(walk)

}

// create a walk
const createWalk = async (req, res) => {
    const { title, location, destination } = req.body

    //add doc to db
    try {
        const walk = await walkDetails.create({ title, location, destination })
        res.status(200).json(walk)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


//delete a walk
const deleteWalk = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such walk' })
    }
    const walk = await walkDetails.findOneAndDelete({ _id: id })
    if (!walk) {
        return res.status(404).json({ error: 'No such walk' })
    }

    res.status(200).json(walk)

}



//update a walk
const updateWalk = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such walk' })
    }
    const walk = await walkDetails.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!walk) {
        return res.status(404).json({ error: 'No such walk' })
    }

    res.status(200).json(walk)

}



module.exports = {
    createWalk,
    getWalks,
    getWalk,
    deleteWalk,
    updateWalk
}