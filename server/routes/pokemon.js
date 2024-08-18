import express from 'express'
import Pokemon from '../models/Pokemon.js';
import PokemonType from '../models/PokemonType.js';
const router = express.Router();

router.get('/types', async function(req, res, next) {
    try {
        console.log('get pokemon types')
        const pokemonTypeList = await PokemonType
            .find()
            .sort({ 'english': 1 })
            .exec()

        res.status(200).json(pokemonTypeList)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.get('/', async function(req, res, next) {
    try {
        console.log('req.query', req.query)

        const typesFilter = req.query.types;
        const nameFilter = req.query.name;
        const query = {}

        if (typesFilter) {
            query.type = { $all: typesFilter }
        }

        if (nameFilter) {
            query['name.english'] = { $regex: new RegExp(nameFilter, 'i') }
        }

        const pokemonList = await Pokemon
            .find(query)
            .sort({ 'name.english': 1 })
            .exec()

        res.status(200).json(pokemonList)
    } catch (error) {
        console.error(error)
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