async function findAndSortPokemonByTypeMatch(typeList) {
    try {
        // Create regex patterns for each type in the typeList
        const regexPatterns = typeList.map(type => new RegExp(`^${type}$`, 'i'));

        const pokemons = await Pokemon.aggregate([
            {
                $addFields: {
                    matchScore: {
                        $size: {
                            $filter: {
                                input: { $ifNull: ['$type', []] }, // Ensure input is an array
                                as: 'type',
                                cond: {
                                    $or: regexPatterns.map(pattern => ({ $regexMatch: { input: '$$type', regex: pattern } }))
                                }
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    matchScore: { $gt: 0 } // Only include Pokémon with at least one matching type
                }
            },
            {
                $sort: { matchScore: -1 } // Sort by matchScore descending, then by name ascending
            }
        ]);

        return pokemons;
    } catch (error) {
        console.error('Error fetching and sorting Pokémon:', error);
        throw error;
    }
}