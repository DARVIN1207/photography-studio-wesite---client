const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/packages.json');

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all packages
router.get('/', (req, res) => {
    const packages = readData();
    res.json(packages);
});

// ADMIN: Update package popularity or price
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    let packages = readData();
    let pkgIndex = packages.findIndex(p => p.id === id);

    if (pkgIndex === -1) {
        return res.status(404).json({ message: 'Package not found' });
    }

    packages[pkgIndex] = { ...packages[pkgIndex], ...updates };
    writeData(packages);

    res.json({ message: 'Package updated', package: packages[pkgIndex] });
});

module.exports = router;
