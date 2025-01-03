const mongoose = require('mongoose');


const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
