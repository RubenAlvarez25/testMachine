var express = require("express");
const testControllers = require("../controllers/testControllers");
var router = express.Router();

//1.createTest
//localhost:4000/test/createTest
router.post("/createTest", testControllers.createTest);

//2.edit test
//localhost:4000/test/editTest
router.put("/editTest/:test_id", testControllers.editTest);

//3.get one test info
//localhost:4000/test/oneTest/:test_id
router.get("/oneTest/:test_id", testControllers.selectOneTest);

//4.get all test info
//localhost:4000/test/allTest
router.get("/alltest", testControllers.selectAllTest);

//5.erase one test
//localhost:4000/test/deleteTest/:test_id
router.delete("/deleteTest/:test_id", testControllers.deleteTest);

//6.filter test by type
//localhost:4000/test/getTestTypeOne
router.get("/getTestTypeOne", testControllers.getTestTypeOne);

router.get("/getTestTypeTwo", testControllers.getTestTypeTwo);

router.get("/getTestTypeOneAndTwo", testControllers.getTestTypeOneAndTwo);

module.exports = router;
