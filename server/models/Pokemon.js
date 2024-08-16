import mongoose from 'mongoose';

const { Schema } = mongoose;

const pokemonSchema = new Schema({
  name: {
    english: { type: String, required: true },
    japanese: { type: String },
    chinese: { type: String },
    french: { type: String }
  },
  type: [{ type: String, required: true }],
  base: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    spAttack: { type: Number, required: true },
    spDefense: { type: Number, required: true },
    speed: { type: Number, required: true }
  },
  species: { type: String, required: true },
  description: { type: String, required: true },
  evolution: {
    next: [[{ type: String }, { type: String }]]
  },
  profile: {
    height: { type: String, required: true },
    weight: { type: String, required: true },
    egg: [{ type: String, required: true }],
    ability: [[{ type: String }, { type: Boolean }]],
    gender: { type: String, required: true }
  },
  image: {
    sprite: { type: String, required: true },
    thumbnail: { type: String, required: true },
    hires: { type: String, required: true }
  }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
