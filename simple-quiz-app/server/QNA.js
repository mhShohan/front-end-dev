const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;