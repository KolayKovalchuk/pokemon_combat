import mongoose from 'mongoose';

const effectivenessSchema = new mongoose.Schema({
  attack: {
    type: String,
    required: true,
    enum: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon']
  },
  defend: {
    type: String,
    required: true,
    enum: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon']
  },
  effectiveness: {
    type: Number,
    required: true,
    enum: [0, 0.5, 1, 2]
  }
});

const Effectiveness = mongoose.model('Effectiveness', effectivenessSchema);

export default Effectiveness
