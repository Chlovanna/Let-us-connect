const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");


// router.get('/', getAllThoughts)
router.route("/").get(getAllThoughts).post(addThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
