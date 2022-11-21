const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: {
         type: String 
        },
    status: { 
        type: Boolean 
    },
    directoryId: 
    { 
        type: String
     },
  },
 
);
module.exports = mongoose.model("TODO", todoSchema);