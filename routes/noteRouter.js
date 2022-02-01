const router = require("express").Router();
const auth = require("../middleware/auth");
const noteCtrl = require("../controllers/noteCtrl");

router
  .route("/") //Here auth ensures that authentication is necessary before tampering with the notes stuff
  .get(auth, noteCtrl.getNotes) //Get route to get all the notes on home page
  .post(auth, noteCtrl.createNote); //Post route to create a note

router //Routes responsible for only tampering with a single note based on it's unique id.
  .route("/:id")
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNote)
  .delete(auth, noteCtrl.deleteNote);

module.exports = router;
