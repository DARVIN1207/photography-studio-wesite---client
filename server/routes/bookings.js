const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/bookings.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all bookings (Admin)
router.get('/', (req, res) => {
    const bookings = readData();
    res.json(bookings);
});

// POST create booking
router.post('/create', (req, res) => {
    const { clientName, phone, shootType, serviceType, selectedPackage, date, location, notes } = req.body;

    if (!clientName || !phone || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const bookings = readData();

    // Simple duplicate check (optional)
    const existing = bookings.find(b => b.phone === phone && b.date === date);
    if (existing) {
        return res.status(409).json({ message: 'Booking already exists for this date and phone number.' });
    }

    const newBooking = {
        bookingId: uuidv4(),
        clientName,
        phone,
        shootType: shootType || 'General',
        serviceType: serviceType || 'Photo & Video',
        selectedPackage: selectedPackage || 'Custom',
        date,
        location: location || 'TBD',
        notes: notes || '',
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    writeData(bookings);

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
});

module.exports = router;
