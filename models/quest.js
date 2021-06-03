const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const QuestSchema = new Schema({
    questId: {type: Schema.Types.ObjectId},
    title: {type: String, required: true},
    description: {type: String, required: true},
    created: { type: Date, default: Date.now },

});



module.exports = mongoose.model("Quests", QuestSchema);