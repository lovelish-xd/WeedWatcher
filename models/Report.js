const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weed',
    required: true,
  },
  date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toLocaleDateString("en-GB"); // DD/MM/YYYY
    }
  },
  weedName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  potentialDiseases: {
    type: [String], 
    required: true,
  },
  solutions: {
    type: [String],  
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Report || mongoose.model('Report', reportSchema);
