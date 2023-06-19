var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
const multerSingle = require("../middleware/multerSingle");
const AnswerController = require("../controllers/answerControllers");

//1. Crea una answer
//localhost:4000/answer/createAnswer
router.post("/createAnswer", AnswerController.createAnswer);

//2. trae la vista todas las respuestas de un usuario
//localhost:4000/answer/OneUserAnswer/:user_id
router.get("/oneUserAnswer/:user_id", AnswerController.oneUserAnswer);

//3.get one answer
//localhost:4000/answer/oneAnswer/:answer_id
router.get("/oneAnswer/:answer_id", AnswerController.selectOneAnswer);

//6. get answer with photo
//localhost:4000/answer/getAnwsersColorimetria/:user_id
router.get("/getAnswerPhoto/:user_id", AnswerController.getAnswersPhoto);

//7.-get answers by test with text
//localhost:4000/answer/getAnswerText/:user_id
router.get("/getAnswerText/:user_id", AnswerController.getAnswerText);

//8.-get answers by test with options
//localhost:4000/answer/getAnswerOption/:user_id
router.get("/getAnswerOption/:user_id", AnswerController.getAnswerOption);

module.exports = router;
