const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({

    usersFeedback: {
        type : String,
        required : true,
    }
})

const Feedback = mongoose.model('feedback', FeedbackSchema)
module.exports = Feedback 