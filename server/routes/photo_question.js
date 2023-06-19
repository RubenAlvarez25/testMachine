var express = require("express");
const photo_questionControllers = require("../controllers/photo_questionControllers");
var router = express.Router();
const multerSingle = require("../middleware/multerSingle");

//1.- createPhoto_question
//localhost:4000/photo_question/createPhoto_question
router.post(
  "/createPhoto_question",
  multerSingle("photo"),
  photo_questionControllers.createPhoto_question
);

//2.- editPhoto_question
//localhost:4000/photo_question/editPhoto_question
// router.put(
//   "/editPhoto_question/:photo_question_id",
//   multerSingle("photo"),
//   photo_questionControllers.editPhoto_question
// );

//3.- deletephoto_question
//localhost:4000/photo_question/deletePhoto_question
// router.delete(
//   "/deletePhoto_question/:photo_question_id",
//   photo_questionControllers.deletePhoto_question
// );

//4.- showAllphoto_questions
//localhost:4000/photo_question/showAllphoto_questions
// router.get(
//   "/showAllPhoto_questions",
//   photo_questionControllers.showAllPhoto_questions
// );

//5.- showOnephoto_question
//localhost:4000/photo_question/showOnephoto_question
router.get(
  "/showOnePhoto_question/:photo_question_id",
  photo_questionControllers.showOnePhoto_question
);

module.exports = router;
