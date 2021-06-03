const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AnswerSchema = new Schema ({
    body: {type: String, required: true, },
    askId: {type: Schema.Types.ObjectId, required: true, },
    created: { type: Date, default: Date.now },
})


module.exports = mongoose.model("Answer", AnswerSchema);