const connection = require("../config/db");
require("dotenv").config();

class QuestionOptionControllers {
  //1.- Trae los datos de todas las question option
  //localhost:4000/questionOptions/getAllQuestionOption
  getAllQuestionOption = (req, res) => {
    let sql = "SELECT * FROM question_option";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //2.- Trae los datos de una sola question option
  //localhost:4000/questionOptions/getOneQuestionOption
  getOneQuestionOption = (req, res) => {
    let question_option_id = req.params.question_option_id;
    let sql = `SELECT * FROM question_option WHERE question_option_id = "${question_option_id}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //3.- Crear una question option
  //localhost:4000/questionOptions/createQuestionOption
  createQuestionOption = (req, res) => {
    const {
      test_id,
      question_id,
      question_option_id,
      photo_question_id,
      option_test_name,
    } = req.body;

    let sql = `INSERT INTO question_option (test_id, question_id, question_option_id, option_test_name) VALUES ("${test_id}", "${question_id}", "${question_option_id}", "${option_test_name}")`;
    if (photo_question_id != undefined) {
      sql = `INSERT INTO question_option (test_id, question_id, question_option_id,photo_question_id, option_test_name) VALUES ("${test_id}", "${question_id}", "${question_option_id}","${photo_question_id}", "${option_test_name}")`;
    }
    connection.query(sql, (error, result) => {
      console.log(error);
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Editar una question option
  //localhost:4000/questionOptions/editQuestionOption/:question_option_id

  editQuestionOption = (req, res) => {
    let question_option_id = req.params.question_option_id;

    const { test_id, question_id, photo_question_id, option_test_name } =
      req.body;

    let sql = `UPDATE question_option SET test_id = "${test_id}", question_id = "${question_id}", photo_question_id = "${photo_question_id}", option_test_name = "${option_test_name}" WHERE question_option_id = "${question_option_id}"`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //5. eliminar una question option
  //localhost:4000/questionOption/deleteQuestionOption/:question_option_id
  deleteQuestionOption = (req, res) => {
    let question_option_id = req.params.question_option_id;
    let sql = `DELETE FROM question_option WHERE question_option_id = "${question_option_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6. get the photo_question_image to show the results
  //localhost:4000/questionOption//getOptions/:question_id
  getOptions = (req, res) => {
    let { question_id } = req.params;
    let sql = `SELECT * FROM question_option WHERE question_id = ${question_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new QuestionOptionControllers();
