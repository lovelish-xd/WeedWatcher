const mongoose = require('mongoose');

const weedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the user who captured the image
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the date when the report is created
  },
  imageUrl: {
    type: String, // Stores the URL or file path of the uploaded image
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Weed', weedSchema);
