const playerModel = require("../models/playerModel")
const mongoose = require("mongoose")


//GET all players
const getPlayers = async (req, res) => {
    const players = await playerModel.find({}).sort({creattedAt: -1})

    res.status(200).json(players)
}



//GET a single player
const getPlayer = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No player found!"})
    }  

    const player = await playerModel.findById(id)
    
    if(!player){
        return res.status(404).json({error: "No player found!" })
    }

    res.status(200).json(player)
}




//POST a new player
const createPlayer = async (req, res) => {
    const {name, age, club} = req.body


    let emptyFields = []

    if(!name) {
        emptyFields.push("name")
    }

    if(!age) {
        emptyFields.push("age")
    }

    if(!club) {
        emptyFields.push("club")
    }

    if(emptyFields.length > 0) {
       return res.status(400).json({error: "please fill in all the fields", emptyFields})
    }



    try {
        const player = await playerModel.create({name, age, club})
        res.status(200).json(player)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



//DELETE a player
const deletePlayer = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Player does not exist!"})
    }  

    const player = await playerModel.findByIdAndDelete({_id: id})
    
    if(!player){
        return res.status(404).json({error: "Player does not exist!" })
    }

    res.status(200).json(player)
    
}



//UPDATE a player
const updatePlayer = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Player does not exist!"})
    }

    const player = await playerModel.findByIdAndUpdate({_id: id}, {...req.body})

    if(!player){
        return res.status(404).json({error: "Player does not exist!" })
    }

    res.status(200).json({player})
}


module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer
}