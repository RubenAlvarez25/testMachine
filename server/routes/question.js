var express = require("express");
const questionControllers = require("../controllers/questionControllers");
var router = express.Router();

//1. CreateQuestion
//localhost:4000/question/createQuestion
router.post("/createQuestion", questionControllers.createQuestion);

//2. get one question info
//localhost:4000/question/oneQuestion/:question_id
router.get("/oneQuestion/:question_id", questionControllers.setOneQuestion);

//3 get questions by one test
//localhost:4000/question/allFromTest/:test_id
router.get("/allFromTest/:test_id", questionControllers.allFromTest);

//4. get ALL questions
//localhost:4000/question/allQuestion
router.get("/allQuestion", questionControllers.setAllQuestion);

//5. edit question
//localhost:4000/question/editQuestion/:question_id
router.put("/editQuestion/", questionControllers.editQuestion);

//6.erase one question
//localhost:4000/question/deleteQuestion/:question_id
router.delete(
  "/deleteQuestion/:question_id",
  questionControllers.deleteQuestion
);

//7. get all questions by test type one
//localhost:4000/question/allQuestionsFromTypeOne
router.get(
  "/allQuestionsFromTypeOne",
  questionControllers.allQuestionsFromTypeOne
);
//8. get all questions by test type two
//localhost:4000/question/allQuestionsFromTypeTwo
router.get(
  "/allQuestionsFromTypeTwo",
  questionControllers.allQuestionsFromTypeTwo
);

module.exports = router;
