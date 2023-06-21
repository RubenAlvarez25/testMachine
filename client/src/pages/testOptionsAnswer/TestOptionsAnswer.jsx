import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './TestOptionsAnswerStyle.scss'

export const TestOptionsAnswer = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [select, setSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)

  const {test_id,test_name} = useParams();

  useEffect(() => {   
    axios
    .get(`http://localhost:4000/question/allFromTest/${test_id}`)
    .then ((res)=>{
        setQuestions(res.data.resultQuestion)
        setearRespuestas(res.data.resultQuestion)
    })
    .catch((err)=>{console.log(err)})
}, [])

const setearRespuestas = (array) => {
  setAnswers(array.map((e)=>{return(
      {
          test_id: test_id,
          question_id: e.question_id,
          user_id: 1,
          answer: ""
      }
  )}))
}
useEffect(() => {
  let question_id = questions[index]?.question_id
    axios
    .get(`http://localhost:4000/questionOptions/getOptions/${question_id}`)
    .then((res)=>{console.log(res)
      setOptions(res.data)
      setAnswers(answers.map((e) => {
      if(e.question_id === questions[index]?.question_id){
        e.answer = res.data[0].option_test_name
        } 
        return e
      }))
     })
    .catch((err)=>{console.log(err)}) 
}, [index,questions])

const testNavigate = (n) => {
  setSelectedOption(0)
  setIndex(index + n)
}

const handleSelect = (ele,i) => {  
  setSelectedOption(i)
     setAnswers( answers.map((e)=>{
      if(e.question_id === ele.question_id){
         e.answer = ele.option_test_name
      }
      return e
  })) 
  setSelect(i)
}

const onSubmit = () =>{
  axios
  .post('http://localhost:4000/answer/createAnswer',answers)
  .then((res)=>{
      console.log(res)
      navigate(`/TestComplete`)
  })
  .catch((err)=>{console.log(err)})
}
  return (
   <div className="container-fluid">
    <div className="row">
      <div className="col-12 d-flex justify-content-center align-items-center p-5">
        <h4>Cool ! lets make a test (the one we already created) : {test_name} </h4>
      </div>
    </div>
    {/* QUESTIONS */}
    <div className="row">
      <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2">
        <h5>{questions[index]?.question_name}</h5>
        <h6>{questions[index]?.question_text}</h6>
      </div> 
      {options.map((e,i)=>{return(
      <div key={i} className="col-12 d-flex flex-column justify-content-center align-items-center p-2">

           <button className={select === i ? "answerSelected" : "" } 
            onClick={()=>handleSelect(e,i)}><p >{e.option_test_name}</p>       
            </button>

      </div>
        )})}
    </div>
    <div className="row">
      <div className="col-12 d-flex flex-column justify-content-center align-items-center p-2">
      {index !== 0 && 
        <button 
        onClick={()=>testNavigate(-1)}>
        Previous
        </button>} 
        &nbsp;
        {index !== questions.length -1 ? 
        <button 
        onClick={()=>testNavigate(+1)}>
        Next</button> : 
        <button 
        onClick={onSubmit}>
        Finish test
        </button>}
      </div>
    </div>
   </div>
  )
}
