import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const TestShortAnswer = () => {
  const navigate = useNavigate()
  const {test_id,test_name} = useParams()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState(0)
  const [response, setResponse] = useState("")

  const handleChange = (e) => {
    setResponse(e.target.value)
  }

  useEffect(() => {
    axios
    .get(`http://localhost:4000/question/allFromTest/${test_id}`)
    .then((res)=>{console.log(res)
    setQuestions(res.data.resultQuestion)
    let provisionalAnswer = res.data.resultQuestion.map((elem)=>{return(
      {
          test_id: elem.test_id,
          question_id: elem.question_id,
          user_id: 1,
          answer: "" 
      }
    )})
    setAnswers(provisionalAnswer)
    })
    .catch((err)=>{console.log(err)})
  }, [])
  
  const testNavigator = (n) => {
    setIndex(index + n)

    let provisionalResult = answers.map((e,i)=>{
      if(i === index){
        e.answer = response
      }
      return e
    })
    setAnswers(provisionalResult)
    setResponse("")
  }

  const onSubmit = () =>{
    let resProvisional = answers.map((e, i) => {
      if (i === index) {
        e.answer = response;
      }
      return e;
    });
   
    axios
    .post('http://localhost:4000/answer/createAnswer',answers)
    .then((res)=>{
        console.log(res)
        navigate("/Success")
    })
    .catch((err)=>{console.log(err)})

  }

  return (
    <div className="container-fluid">
      {/* TITLE */}
    <div className="row">
      <div className="col-12 d-flex align-items-center justify-content-center p-5">
        <h4>Cool ! lets make a test (the one we already created) : {test_name} </h4>
      </div>
    </div>
    {/* QUESTION NAME and TEXT */}
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-center p-2">
        <h4>{questions[index]?.question_name}</h4>
        <h5>{questions[index]?.question_text}</h5>
      </div>
    </div>
    {/* ANSWER INPUT */}
    <div className="row">
      <div className="col-12 d-flex align-items-center justify-content-center p-2">
      <input type="text" 
        value={response} 
        autoComplete='off'
        onChange={handleChange}
        name='answer'/>
      </div>
    </div>
    {/* BUTTONS */}
    <div className="row">
      <div className="col-12 d-flex align-items-center justify-content-center p-2">
      {index !== 0 && 
        <button 
        onClick={()=>testNavigator(-1)}>
        Previous
        </button>} 
        &nbsp;
        {index < questions?.length -1 ? 
        <button 
        onClick={()=>testNavigator(+1)}>
        Next</button>: 
        <button 
        onClick={onSubmit}>
        Finish !
        </button>}
      </div>
    </div>
   </div>
  )
}
