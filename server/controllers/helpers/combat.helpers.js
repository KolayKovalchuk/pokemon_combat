export function getInitCombatLog(playerPokemon, opponent) {
    return `Combat beetwen ${playerPokemon.name.english} and ${opponent.name.english} started!!!`
}

export function getAttackLog(attackType, attackDamage, attackerName, defenderName) {
    return `${attackerName} attakes ${defenderName} with ${attackType} attack and give ${attackDamage} damage`
}

export function getFinishedLog(winnerName) {
    return `Combat finished with ${winnerName} as a winner!!!`
}

export function getRandomElement(array) {
    if (array.length === 0) {
        throw new Error('Cannot get a random element from an empty array');
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}