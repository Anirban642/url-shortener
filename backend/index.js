require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
// Configure CORS to allow specific origin
app.use(cors({
  origin: 'https://url-shortener-frontend-45ad.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Debug route mounting
app.use('/api', urlRoutes);
console.log('Mounted /api routes');
app.use('/', urlRoutes);
console.log('Mounted / routes');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));