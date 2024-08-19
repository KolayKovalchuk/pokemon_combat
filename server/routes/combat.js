import express from 'express'
import Effectiveness from '../models/Effectiveness.js';
import OpponentController from '../controllers/opponent.controller.js';

const router = express.Router();

router.get('/effectiveness', async function(req, res, next) {
    try {
        console.log('get pokemon effectiveness')
        const effectivenessList = await Effectiveness
            .find()
            .sort({ 'attack': 1, 'defend': 1, 'effectiveness': 1 })
            .exec()

        res.status(200).json(effectivenessList)
    } catch (error) {
        console.log('get effectiveness error');
        res.status(500).send(error.message)
    }
})

router.get('/opponent/:id', async function(req, res, next) {
    try {
        console.log('get pokemon opponent')
        const effectivenessList = await OpponentController.getCombatOpponent(req.params.id)

        res.status(200).json(effectivenessList)
    } catch (error) {
        console.log('get effectiveness error');
        res.status(500).send(error.message)
    }
})

export default router