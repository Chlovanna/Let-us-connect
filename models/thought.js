const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get : secs => new Date(secs).toLocaleDateString()
    }
}
)


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get : secs => new Date(secs).toLocaleDateString()
    },
    username: 
      {
        type: String,
        require: true,
        // ref: "Thought",
      },
    

      
    reactions: [
      reactionSchema
    ],
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
