import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const  initialValues = {
  test_name: "",
  test_id: "",
  question_name: "",
  question_text: "",
  question_id: ""
}

export const CreateQuestionText = () => {
  const navigate= useNavigate();
  const [question, setQuestion] = useState(initialValues)
  const [questions, setQuestions] = useState([])

  const {test_name,test_id} = useParams();

  const handleChange = (e) => {
    let {name,value} = e.target
    setQuestion({...question,[name]:value,test_id:test_id,test_name:test_name})
  }

  const onSubmit = () => {
    //question_id generator mothod, same in utils
    let question_id = Date.now().toString();
    let prueba = parseInt(
      question_id.slice(question_id.length - 8, question_id.length)
    );

  const data = {...question,question_id:prueba}
    setQuestions([...questions,data])
    setQuestion(initialValues)
  }

  const delQuestion = (index) =>{
    const arrayTemp = questions.filter((item,idx)=> idx !==index)
    setQuestions(arrayTemp)
  }

  const sendQuestion = () => {
    axios
    .post("http://localhost:4000/question/createQuestion",questions)
    .then((res)=>{console.log(res)
    navigate("/Success")})
    .catch((err)=>{console.log(err)})
  }
  
  return (
    <div className="container-fluid">
      {/* INTRODUCCTION */}
      <div className="row">
        <div className="col-12">
          <h3>
          Great !
        </h3>
        <p> now that you created the test, you need to fill it up with some questions, don't you think ?</p> 
        <p>This test needs to be respond by the user using its keyboard. Than means it is a "short answers" kind of test </p>
        </div>
      </div>
      {/* INPUTS */}
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center p-3">
          <h4>First, just name the question</h4>
          <input
                    className=''
                    type="text"
                    placeholder='add question'
                    autoComplete='off'
                    autoCapitalize='on'
                    name="question_name"
                    onChange={handleChange}
                    value={question.question_name}
                  />
          <h4>then just make a title to its sentence </h4>
          <input
                    className=''
                    type="text"
                    placeholder='add a title of its sentence'
                    autoComplete='off'
                    autoCapitalize='on'
                    name="question_text"
                    onChange={handleChange}
                    value={question.question_text}
                  />
                &nbsp;&nbsp;
          <button onClick={onSubmit}>Amazing ! now you can add this questions to the list</button>
        </div>
      </div>
      {/* MAP and LIST */}
      <div className="row">
        <div className="col-12">
          <h3>Okay! here is the list of the questions before you send it</h3>
        </div>
        <div className="col-12 d-flex flex-column justify-content-center align-items-center p-3">
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
           <thead>
           <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>Question</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
          </tr>
          </thead>
          <tbody>
          {questions.map((e, index) => {
            return (
          <tr key={index}>
          <td style={{ border: "1px solid black", padding: "8px" }}>{e.question_name}</td>
          <td style={{ border: "1px solid black", padding: "8px" }}>{e.question_text}</td>
          <td style={{ border: "1px solid black", padding: "8px" }}> <button onClick={()=>delQuestion(index)}>X</button></td>
         </tr>
          );
        })}
        </tbody>
      </table>
      &nbsp;&nbsp;
      {/* BUTTON SEND */}
      <button onClick={sendQuestion}>Finish Test and send </button>
        </div>
      </div>
    </div>
  )
}
