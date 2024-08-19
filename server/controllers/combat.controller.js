import Combat from '../models/combat.js';
import Effectiveness from '../models/Effectiveness.js';
import User from '../models/User.js';
import { getAttackLog, getFinishedLog, getInitCombatLog, getRandomElement } from './helpers/combat.helpers.js';


export default class CombatController {
    static async startCombat(userAddress, playerPokemon, opponent) {
        try {
            const isPlayerMove = CombatController.isPlayerMoveFirst(playerPokemon, opponent)
            const player = await User.findOne({ address: userAddress })
            const combat = new Combat({
                player,
                playerHP: playerPokemon.base.hp,
                playerPokemon,
                opponent,
                opponentHP: opponent.base.hp,
                logList: [getInitCombatLog(playerPokemon, opponent)],
                isPlayerMove: isPlayerMove
            })

            if (!isPlayerMove) {
                await CombatController.processUserDefence(combat, playerPokemon, opponent)
            } else {
                combat.isFinished = CombatController.isCombatFinished(combat)
                if (combat.isFinished) {
                    CombatController.addFinishedLog(combat, playerPokemon, opponent)
                }
                await combat.save()
            }

            console.log(combat);

            return combat
        } catch (error) {
            console.log('startCombat error', error);
        }
    }

    static async processUserDefence(combat, playerPokemon, opponent) {
        const attackType = getRandomElement(opponent.type)
        const baseAttackPower = attackType == 'normal' ? opponent.base.attack : opponent.base.spAttack
        const baseDefencePower = attackType == 'normal' ? playerPokemon.base.defense : playerPokemon.base.spDefense
        const attackDamage = await CombatController.calculateDamage(attackType, baseAttackPower, playerPokemon.type, baseDefencePower)
        combat.playerHP = combat.playerHP - attackDamage

        if (combat.playerHP < 0) {
            combat.playerHP = 0
        }

        const attackLog = await getAttackLog(attackType, attackDamage, opponent.name.english, playerPokemon.name.english)
        combat.logList.push(attackLog)
        combat.isPlayerMove = !combat.isPlayerMove

        combat.isFinished = CombatController.isCombatFinished(combat)
        if (combat.isFinished) {
            CombatController.addFinishedLog(combat, playerPokemon, opponent)
        }
        await combat.save()

        return combat
    }

    static async processUserAttack(attackType, combatId) {
        const combat = await Combat
            .findById(combatId)
            .populate('playerPokemon')
            .populate('opponent');

        const opponent = combat.opponent
        const playerPokemon = combat.playerPokemon

        const baseAttackPower = attackType == 'normal' ? playerPokemon.base.attack : playerPokemon.base.spAttack
        const baseDefencePower = attackType == 'normal' ? opponent.base.defense : opponent.base.spDefense
        const attackDamage = await CombatController.calculateDamage(attackType, baseAttackPower, opponent.type, baseDefencePower)

        combat.opponentHP = combat.opponentHP - attackDamage

        if (combat.opponentHP < 0) {
            combat.opponentHP = 0
        }

        const attackLog = await getAttackLog(attackType, attackDamage, playerPokemon.name.english, opponent.name.english)
        combat.logList.push(attackLog)
        combat.isPlayerMove = !combat.isPlayerMove

        combat.isFinished = CombatController.isCombatFinished(combat)
        if (combat.isFinished) {
            CombatController.addFinishedLog(combat, playerPokemon, opponent)
        }

        await combat.save()

        if (!combat.isFinished) {
            await CombatController.processUserDefence(combat, playerPokemon, opponent)
        }

        return combat
    }

    static addFinishedLog(combat, playerPokemon, opponent) {
        const winnerName = combat.playerHP ? playerPokemon.name.english : opponent.name.english
        const finishedLog = getFinishedLog(winnerName)
        combat.logList.push(finishedLog)
    }

    static isCombatFinished(combat) {
        return Boolean(!combat.playerHP || !combat.opponentHP)
    }

    static isPlayerMoveFirst(playerPokemon, opponent) {
        return playerPokemon.base.speed >= opponent.base.speed
    }

    static async calculateDamage(attackType, attackPower, defenderTypes, defencePower) {
        const effectiveness = await CombatController.getAttackEffectivness(attackType, defenderTypes)
        const randomMul = Math.random();
        console.log(randomMul)
        return Math.round(((attackPower*10)/defencePower) * effectiveness * randomMul)
        // const effectiveness = await CombatController.getAttackEffectivness(attackType, defenderTypes)
        // const randomMul = Math.random();
        // const level = 2
        // const power = 2
        // const damage = ((( 2 * level / 5) * power * (attackPower/defencePower)) / 50 + 2) * effectiveness * randomMul
        // return Math.round(damage)

    }

    static async getAttackEffectivness(attackType, defenderTypes) {
        const defenderTypesLower = defenderTypes.map(d => d.toLowerCase())
        const attackTypeLower = attackType.toLowerCase()
        const effectiveness = await Effectiveness.find({
            defend: { $in: defenderTypesLower },
            attack: attackTypeLower
        }).sort({ effectiveness: -1 })

        console.log(effectiveness);

        if (effectiveness.length) {
            return effectiveness[0].effectiveness
        }

        return 1
    }
}