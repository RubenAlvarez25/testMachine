const connection = require("../config/db");
require("dotenv").config();

class AnswerController {
  //1. add an answer
  //localhost:4000/answer/createAnswer
  createAnswer = (req, res) => {
    console.log("------", req.body);
    let result;
    req.body.forEach((e) => {
      let sql = `INSERT INTO answer (test_id,question_id,answer,user_id) VALUES (${e.test_id},${e.question_id},"${e.answer}",${e.user_id})`;
      connection.query(sql, (error, result) => {
        if (error) res.status(400);
        result = result;
      });
    });
    res.status(200).json("TODOoK");
  };
  //2. get all answers by user
  //localhost:4000/answer/OneUserAnswer/:user_id
  oneUserAnswer = (req, res) => {
    const user_id = req.params.user_id;

    let sql = `SELECT * FROM answer WHERE answer.user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //3.get one answer
  //localhost:4000/answer/oneAnswer/:answer_id
  selectOneAnswer = (req, res) => {
    let answer_id = req.params.answer_id;

    let sql = `SELECT * FROM answer WHERE answer_id = "${answer_id}"`;
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //4. get answer with photo
  //localhost:4000/answer/getAnwsersColorimetria/:user_id
  getAnswersPhoto = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT answer FROM answer
    JOIN test ON answer.test_id = test.test_id WHERE test.type = 3  AND 
    answer.user_id = ${user_id} `;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //5.-get answers by test with text
  //localhost:4000/answer/getAnswerText/:user_id
  getAnswerText = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT answer FROM answer
    JOIN test ON answer.test_id = test.test_id WHERE test.type = 1  AND 
    answer.user_id = ${user_id}`;
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //6.-get answers by test with options
  //localhost:4000/answer/getAnswerOption/:user_id
  getAnswerOption = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT answer FROM answer
    JOIN test ON answer.test_id = test.test_id WHERE test.type = 2  AND 
    answer.user_id = ${user_id}`;
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //7.-get answes by test
  //localhost:4000/answers/getAnswerByTest/:test_id
  getAnswerByTest = (req, res) => {
    let { test_id, user_id } = req.params;

    let sql = `SELECT answer FROM answer JOIN user ON user.user_id = answer.user_id WHERE answer.test_id = ${test_id}`;
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
}
module.exports = new AnswerController();
