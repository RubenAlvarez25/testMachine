import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialTestValues = {
    test_name: "",
    type: "",
  };

export const CreateTest = () => {
    const navigate = useNavigate();
    const [test, setTest] = useState(initialTestValues)

    const handleChange = (e) => {
        const {name,value} = e.target
        setTest({...test,[name]:value})
      }

    const onSubmit = () => {
        axios
        .post("http://localhost:4000/test/createTest",test)
        .then((res)=>{console.log(res)
        if(test.type === "Short Answer Tests"){
            navigate(`/CreateQuestionText/${res.data.insertId}/${test.test_name}`)
        }else if(test.type === "Multiple Choice Tests"){
            navigate(`/CreateQuestionOption/${res.data.insertId}/${test.test_name}`)
        }
    
    })
        .catch((err)=>{console.log(err)})
    }

  return (
    <div className="container-fluid">
        {/* TITLE */}
        <div className="row">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center p-3">
            <h3>Create Test</h3>
            <p>our first step is to create a test, all test has a name so...</p>
            </div> 
        </div>
        {/* INPUT TEST NAME */}
        <div className="row">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center p-3">
                <input   
                type="text"
                placeholder="test name"
                autoComplete="off"
                name="test_name"
                onChange={handleChange}
                value={test.test_name}/>
            </div>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center pt-3">
                <h5>brilliant ! now choose wich kind of test u want !</h5>
                {/* SELECT OPTIONS */}
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <select onChange={handleChange} value={test.type} name="type" id="">
                  <option disabled value="">choose</option>
                  <option 
                  >Short Answer Tests</option>
                  <option >
                  Multiple Choice Tests
                  </option>
            </select>
            </div>
            </div>
        </div>
        {/* BUTTON */}
        <div className="row">
            <div className="col-12">
                <button onClick={onSubmit} >Create Test !</button>
            </div>
        </div>
    </div>
  )
}
