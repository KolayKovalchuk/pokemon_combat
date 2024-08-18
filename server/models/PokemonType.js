import mongoose from 'mongoose';

const PokemonTypeSchema = new mongoose.Schema({
  english: {
    type: String,
    required: true
  },
  chinese: {
    type: String,
    required: true
  },
  japanese: {
    type: String,
    required: true
  },
  effective: {
    type: [String],  // Array of strings
    default: []
  },
  ineffective: {
    type: [String],  // Array of strings
    default: []
  },
  no_effect: {
    type: [String],  // Array of strings
    default: []
  }
});

const PokemonType = mongoose.model('PokemonType', PokemonTypeSchema);

export default PokemonType
