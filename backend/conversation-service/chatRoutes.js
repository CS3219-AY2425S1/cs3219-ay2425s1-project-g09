const express = require('express');
const Conversation = require('./models/Conversation');
const router = new express.Router();

// POST endpoint to create a new Conversation document
router.post('/conversations', async (req, res) => {
    try {
        const { conversation_id } = req.body;

        // Check if a conversation with the same conversation_id already exists
        const existingConversation = await Conversation.findOne({ conversation_id });

        if (existingConversation) {
            return res.status(201).send(existingConversation);
        }

        // Create and save the new conversation
        const newConversation = new Conversation(req.body);
        await newConversation.save();
        res.status(201).send(newConversation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET endpoint to retrieve a conversation by ID
router.get('/conversations/:id', async (req, res) => {
    //TODO: Implement this endpoint
    try {
        const conversation = await Conversation.findOne({ conversation_id: req.params.conversation_id });
        if (!conversation) {
            return res.status(404).send();
        }
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PATCH endpoint to update a conversation by ID
router.patch('/conversations/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['messages'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const conversation = await Conversation.findOneAndUpdate({conversation_id: req.params.conversation_id}, req.body, { new: true, runValidators: true });
        if (!conversation) {
            return res.status(404).send();
        }
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE endpoint to delete a conversation by ID
router.delete('/conversations/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndDelete(req.params.conversation_id);
        if (!conversation) {
            return res.status(404).send();
        }
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
