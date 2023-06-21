const connection = require("../config/db");
require("dotenv").config();

class TestControllers {
  //1.createTest
  //localhost:4000/test/createTest
  createTest = (req, res) => {
    const { test_name, type } = req.body;

    if (req.body.type === "Short Answer Tests") {
      req.body.type = parseInt(1);
    } else if (req.body.type === "Multiple Choice Tests") {
      req.body.type = parseInt(2);
    }
    let sql = `INSERT INTO test (test_name,type) VALUES ('${test_name}',${parseInt(
      req.body.type
    )})`;

    connection.query(sql, (error, result) => {
      console.log(error);
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };
  //2.edit test
  //localhost:4000/test/editTest
  editTest = (req, res) => {
    let test_id = req.params.test_id;

    const { test_name } = req.body;

    let sql = `UPDATE test SET test_name = "${test_name}" WHERE test_id = "${test_id}"`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  //3.get one test info
  //localhost:4000/test/oneTest/:test_id
  selectOneTest = (req, res) => {
    const test_id = req.params.test_id;

    let sql = `SELECT * FROM test WHERE test_id = "${test_id}" and is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ result });
    });
  };
  ///4.get all test info
  //localhost:4000/test/allTest
  selectAllTest = (req, res) => {
    let sql = `SELECT * FROM test WHERE test.is_deleted = 0 GROUP BY test.test_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //5.erase one test
  //localhost:4000/test/deleteTest/:test_id
  deleteTest = (req, res) => {
    let test_id = req.params.test_id;

    let sql = `DELETE FROM test WHERE test_id = "${test_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6.filter test by type
  //localhost:4000/test/getTestTypeOne
  getTestTypeOne = (req, res) => {
    let sql = `SELECT * FROM test WHERE type = 1 and is_deleted = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  getTestTypeTwo = (req, res) => {
    let sql = `SELECT * FROM test WHERE type = 2 and is_deleted = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
  getTestTypeOneAndTwo = (req, res) => {
    let sql = `SELECT * FROM test WHERE (type = 1 OR type = 2) AND is_deleted = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new TestControllers();
