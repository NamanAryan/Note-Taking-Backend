const express = require('express');
const Note = require('../models/Notes.js');
const protect = require('../middleware/auth');
const router = express.Router();

router.post('/note', protect, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
            user: req.user,  
        });
        await newNote.save();
        res.status(200).json({ message: "Note added successfully!" });
    } catch (error) {
        res.status(400).json({ message: "An error occurred while saving data into the database" });
    }
});

router.get('/notes', protect, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/notes/:id', protect, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/notes/:id', protect, async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/notes/:id', protect, async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
