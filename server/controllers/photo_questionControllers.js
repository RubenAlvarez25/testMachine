const connection = require("../config/db");
require("dotenv").config();

class Photo_QuestionControllers {
  //1.- createPhoto_question
  //localhost:4000/photo_question/createPhoto_question
  createPhoto_question = (req, res) => {
    const { photo_question_name } = req.body;

    let file = "";

    let sql = `INSERT INTO photo_question (photo_question_name) VALUES ("${photo_question_name}")`;
    if (req.file != undefined) {
      file = req.file.filename;
      sql = `INSERT INTO photo_question (photo_question_name,photo_question_img) VALUES ("${photo_question_name}","${file}")`;
    }
    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result, file });
    });
  };
  //5.- showOnephoto_question
  //localhost:4000/photo_question/showOnephoto_question
  showOnePhoto_question = (req, res) => {
    let photo_question_id = req.params.photo_question_id;

    let sql = `SELECT * FROM photo_question WHERE photo_question_id = ${photo_question_id}`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };
}

module.exports = new Photo_QuestionControllers();
