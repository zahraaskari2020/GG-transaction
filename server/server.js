const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
global.dotenv=dotenv;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', api);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Start the server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
