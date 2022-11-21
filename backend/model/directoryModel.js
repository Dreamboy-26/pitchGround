const mongoose = require("mongoose");
const directorySchema = new mongoose.Schema({
  directoryName: {
     type: String 
    },
  todoId: {
     type: String
     },
});

module.exports = mongoose.model("directory", directorySchema);