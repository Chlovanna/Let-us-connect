const { Thought, User } = require('../models');

const thoughtController = {
  //Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'users',
      select: '-__v'
    })
    .select('-__v')
    .sort(({ _id: -1 }))
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //Get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path: 'user',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => {
      //if no thought found send 404
      if (!dbThoughtData) {
        res.status(404).json({ message: 'This id does not return a Thought!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

   // Add a thought to a user
   addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This id does not return a User!' });
          return;
        }
        res.json(dbUserData);        
      })
      .catch(err => res.json(err));
  },

  //Update a thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      {new: true, runValidators: true })
      .then(updatedThought => {
        if (!updatedThought) {
          res.status(404).json({ message: 'This id does not return a Thought!' });
          return;
        }
        res.json(updatedThought);
      })
      .catch(err => res.status(400).json(err));
  },

  //Delete a thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'This id does not return a Thought!' });
      }      
      res.json(deletedThought);
    })
    .catch(err => res.json(err));
  },

  //Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body} },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'This id does not return a Thought! '});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => res.json(err));
  },

  //Delete a reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;