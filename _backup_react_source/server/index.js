const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data Routes
const bookingRoutes = require('./routes/bookings');
const packageRoutes = require('./routes/packages');
const mediaRoutes = require('./routes/media');

// Routes
app.get('/', (req, res) => {
    res.send('SR Cinematic API is Running 🎥');
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/media', mediaRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 SR Cinematic Backend running at http://localhost:${PORT}`);
    console.log(`   - Health Check: http://localhost:${PORT}/`);
    console.log(`   - Bookings API: http://localhost:${PORT}/api/bookings`);
});
