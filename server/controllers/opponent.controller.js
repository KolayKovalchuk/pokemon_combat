import Effectiveness from '../models/Effectiveness.js';
import Pokemon from '../models/Pokemon.js';
import { getRandomElement } from './helpers/combat.helpers.js';

export default class OpponentController {
    static async getCombatOpponent(pokemonId) {
        const pokemon = await Pokemon.findById(pokemonId)
        const { mostEffectiveAttack, mostEffectiveDefence } = await OpponentController.getMostEffectiveTypesAgainst(pokemon.type)

        const opponentTypes = [...new Set([
            ...mostEffectiveAttack.map((effectiveness) => effectiveness.attack),
            ...mostEffectiveDefence.map((effectiveness) => effectiveness.defend)
        ])]

        console.log('opponentTypes', opponentTypes);
        const opponentTypesR = new RegExp(opponentTypes.join('|'))

        const opponentList = await Pokemon.find({
            type: { $regex: opponentTypesR, $options: 'i' }
        })

        return getRandomElement(opponentList)
    }

    static async getMostEffectiveTypesAgainst(typeList) {
        const typeListLower = typeList.map((t) => t.toLowerCase())

        let mostEffectiveAttack = await Effectiveness.find({
            defend: { $in: typeListLower }
        })
            .sort({ effectiveness: -1 })
            .limit(4)

        let mostEffectiveDefence = await Effectiveness.find({
            attack: { $in: typeListLower }
        })
            .sort({ effectiveness: 1 })
            .limit(4)

        mostEffectiveAttack = mostEffectiveAttack.filter(({ effectiveness }) => effectiveness === mostEffectiveAttack[0].effectiveness)
        mostEffectiveDefence = mostEffectiveDefence.filter(({ effectiveness }) => effectiveness === mostEffectiveDefence[0].effectiveness)

        return {
            mostEffectiveAttack,
            mostEffectiveDefence
        }
    }
}