const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/media.json');

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]');
        }
        const jsonData = fs.readFileSync(dataPath);
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all media
router.get('/', (req, res) => {
    const media = readData();
    res.json(media);
});

// POST new media
router.post('/', (req, res) => {
    const { url, category, title } = req.body;

    if (!url || !category) {
        return res.status(400).json({ error: 'URL and Category are required' });
    }

    const media = readData();
    const newMedia = {
        id: uuidv4(),
        url,
        category,
        title: title || 'Untitled',
        createdAt: new Date().toISOString()
    };

    media.push(newMedia);
    writeData(media);

    res.status(201).json(newMedia);
});

// DELETE media
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let media = readData();
    const initialLength = media.length;

    media = media.filter(item => item.id !== id);

    if (media.length === initialLength) {
        return res.status(404).json({ error: 'Media not found' });
    }

    writeData(media);
    res.json({ message: 'Media deleted successfully' });
});

module.exports = router;
