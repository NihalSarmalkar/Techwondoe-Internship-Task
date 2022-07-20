const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 500,
    },
    review: {
      type: String,
    },
    rating: {
      type: String,
    },
    streamApp: {
      type: String,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
