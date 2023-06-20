const connection = require("../config/db");
require("dotenv").config();

class QuestionControllers {
  //1. CreateQuestion
  //localhost:4000/question/createQuestion
  createQuestion = (req, res) => {
    let questions = req.body;
    let test_id = req.body[0].test_id;

    questions.forEach((elem) => {
      let sql = `INSERT INTO question (test_id,question_id,question_name,question_text) VALUES (${elem.test_id},${elem.question_id},"${elem.question_name}","${elem.question_text}")`;
      connection.query(sql, (error) => {
        if (error) {
          res.status(500).json(error);
        }

        this.guardarOpciones(elem.questions, test_id);
      });
    });
    res.status(200).json("ENVIADO ");
  };

  guardarOpciones = (options, test_id) => {
    if (options != undefined) {
      options.forEach((e) => {
        if (e.photo_question_id === undefined) {
          e.photo_question_id = null;
        } else {
          e.photo_question_id = parseInt(e.photo_question_id);
        }
        let sqlOption = `INSERT INTO question_option (test_id,question_id,question_option_id,option_test_name,photo_question_id) VALUES (${test_id},${e.question_id},${e.question_option_id},"${e.option_test_name}",${e.photo_question_id})`;
        connection.query(sqlOption, (error) => {
          if (error) throw error;
        });
      });
    }
  };

  //2. get one question info
  //localhost:4000/question/oneQuestion/:question_id
  setOneQuestion = (req, res) => {
    const question_id = req.params.question_id;

    let sql = `SELECT * FROM question WHERE question_id = "${question_id}" and is_deleted = 0 `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //3 get questions by one test
  //localhost:4000/question/allFromTest/:test_id
  allFromTest = (req, res) => {
    const test_id = req.params.test_id;

    let sql = `SELECT * FROM test WHERE test_id = ${Number(
      test_id
    )}  and is_deleted = 0`;
    let sql2 = `SELECT * FROM question WHERE question.test_id = ${Number(
      test_id
    )} and is_deleted = 0`;

    connection.query(sql, (error, resultTest) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, resultQuestion) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultTest, resultQuestion });
      });
    });
  };

  //4. get ALL questions
  //localhost:4000/question/allQuestion
  setAllQuestion = (req, res) => {
    let sql = `SELECT * FROM question WHERE is_deleted=0  
    ORDER BY question.test_id `;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //5. edit question
  //localhost:4000/question/editQuestion/:question_id
  editQuestion = (req, res) => {
    // const question_id = req.params.question_id;
    const { question_name, question_text, question_id } = req.body;

    let sql = `UPDATE question SET question_name = "${question_name}", question_text = "${question_text}" WHERE question_id = "${question_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6.erase one question
  //localhost:4000/question/deleteQuestion/:question_id
  deleteQuestion = (req, res) => {
    const question_id = req.params.question_id;

    // let sql = `UPDATE question SET is_deleted = 1 WHERE question_id = "${question_id}"`;

    let sql = `DELETE FROM question WHERE question_id = "${question_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //7. get all questions by test type one
  //localhost:4000/question/allQuestionsFromTypeOne
  allQuestionsFromTypeOne = (req, res) => {
    let sql = `SELECT *
    FROM question
    JOIN test ON question.test_id = test.test_id
    WHERE test.type = 1`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
  //8. get all questions by test type two
  //localhost:4000/question/allQuestionsFromTypeTwo
  allQuestionsFromTypeTwo = (req, res) => {
    let sql = `SELECT *
    FROM question
    JOIN test ON question.test_id = test.test_id
    WHERE test.type = 2`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new QuestionControllers();
