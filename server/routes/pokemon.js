import express from 'express'
import Pokemon from '../models/Pokemon.js';
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        const pokemonList = await Pokemon.find()
        res.status(200).json(pokemonList)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const pokemon = await Pokemon.findById(req.params.id)
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post('/', async function(req, res, next) {
    try {
        const result = Pokemon.insertMany(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

export default router
