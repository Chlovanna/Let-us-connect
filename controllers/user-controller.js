const userController = {
    //get all users
    getAllUsers(req, res) {
      User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },
  
    //get on user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        // send 404 if no user found
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },
  
    //create a User
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
  
    //update a user by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
  
    //delete User
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
  
    //add friend
    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId},
        { $push: { friends: params.friendsId } },
        { new: true, runValidators: true}
      )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this Id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },
  
    //remove friend
    removeFriend({ params }, res) {
      User.findByIdAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendsId } },
        { new: true}
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
    }
  };
  
  module.exports = userController;