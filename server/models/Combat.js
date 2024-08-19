import mongoose from 'mongoose';

const { Schema } = mongoose;

const CombatSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    playerHP: {
        type: Number,
    },
    playerPokemon: {
        type: Schema.Types.ObjectId,
        ref: 'Pokemon',  // Reference to the Pokemon model's _id
        required: true,
    },
    opponent: {
        type: Schema.Types.ObjectId,
        ref: 'Pokemon',  // Reference to the Pokemon model's _id
        required: true,
    },
    opponentHP: {
        type: Number,
    },
    logList: {
        type: [String],  // Array of strings
        required: true,
    },
    isPlayerMove: Boolean,
    isFinished: Boolean,
}, {
    timestamps: true,  // Add createdAt and updatedAt fields
});

const Combat = mongoose.model('Combat', CombatSchema);

export default Combat;
