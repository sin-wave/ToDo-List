const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
});

const ToDo_list = mongoose.model("ToDo_list", listSchema);
module.exports = ToDo_list;