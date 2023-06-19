var express = require("express");
var router = express.Router();
const questionOptionControllers = require("../controllers/questionOptionsControllers");

//1.- getAllQuestionOption
//localhost:4000/questionOptions/getAllQuestionOption
router.get(
  "/getAllQuestionOption",
  questionOptionControllers.getAllQuestionOption
);

//2.- getOneQuestionOption
//localhost:4000/questionOptions/getOneQuestionOption
router.get(
  "/getOneQuestionOption/:question_option_id",
  questionOptionControllers.getOneQuestionOption
);

//3.- createQuestionOption
//localhost:4000/questionOptions/createQuestionOption
router.post(
  "/createQuestionOption",
  questionOptionControllers.createQuestionOption
);

//4.- editQuestionOption
//localhost:4000/questionOptions/editQuestionOption
router.put(
  "/editQuestionOption/:question_option_id",
  questionOptionControllers.editQuestionOption
);

//5.- deleteQuestionOption
//localhost:4000/questionOptions/deleteQuestionOption
router.delete(
  "/deleteQuestionOption/:question_option_id",
  questionOptionControllers.deleteQuestionOption
);

//6. get the photo_question_image to show
//localhost:4000/questionOption//getOptions/:question_id
router.get("/getOptions/:question_id", questionOptionControllers.getOptions);

module.exports = router;
