const mongoose = require("mongoose");

const memo = mongoose.Schema({
  text: {
    type: String,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model("Memo", memo);
