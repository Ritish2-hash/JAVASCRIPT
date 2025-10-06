const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, require: true,  },
  password:  String,
  blogs:[{ type: mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  }]
});

module.exports =mongoose.model("User", userSchema);
