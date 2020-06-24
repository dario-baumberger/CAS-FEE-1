let router = require("express").Router();

let noteController = require("../controllers/notesController");

router.route("/notes").get(noteController.index).post(noteController.new);
router
  .route("/notes/:note_id")
  .get(noteController.view)
  .patch(noteController.update)
  .put(noteController.update)
  .delete(noteController.delete);

// Export API routes
module.exports = router;
