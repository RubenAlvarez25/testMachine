import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './ResultsStyle.scss'

export const ShortAnswerResults = () => {

  const [tests, setTests] = useState([])
  const [questions,setQuestions] = useState([])
  const [answers,setAnswers] = useState ([])

  const {test_id,user_id} = useParams()
  const navigate = useNavigate()
  
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/test/oneTest/${test_id}`)
    .then((res)=>{console.log(res)
    setTests(res.data.result)})
    .catch((err)=>{console.log(err)})
  
  }, [])

  useEffect(()=>{

    axios
    .get(`http://localhost:4000/question/allFromTest/${test_id}`)
    .then((res)=>{console.log(res)
    setQuestions(res.data.resultQuestion)})
    .catch((err)=>{console.log(err)})

  },[])

  useEffect(()=>{
    axios
    .get(`http://localhost:4000/answer/getAnswerByTest/${test_id}`)
    .then((res)=>{console.log(res)
    setAnswers(res.data.result)})
    .catch((err)=>{console.log(err)})

  },[])

  return (
    <div className="container-fluid">
      {/* TITLE */}
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center p-5 ">
          {tests.map((e,i)=>{return(
          <h4 key={i}>
            This are the results of the test:  <span className='titlesar'>{e?.test_name}</span>
          </h4>
          )})}
        </div>
      </div>
      {/* Q&A TABLE */}
      <div className="row">
      <div className="col-12 d-flex justify-content-center align-items-center p-5">
      <table className="tabla" style={{borderCollapse: 'collapse'}}>
        <thead>
        <tr style={{backgroundColor: '#f2f2f2'}}>
        <th style={{padding: '12px 16px', borderBottom: '1px solid #ddd'}}>Question</th>
        <th style={{padding: '12px 16px', borderBottom: '1px solid #ddd'}}>Answer</th>
        </tr>
        </thead>
        <tbody>
        {answers.map((answer, index) => (
        <tr key={index}>
        <td style={{borderBottom: '1px solid #ddd', padding: '8px 16px'}}>{questions[index]?.question_name}</td>
        <td style={{borderBottom: '1px solid #ddd', padding: '8px 16px'}}>{answer?.answer}</td>
        </tr>
        ))}
        </tbody>
      </table>
      </div>
      </div>
      {/* BUTTON */}
      <div className="row">
        <div className="col-12 d-flex justify-content-start align-items-start p-3">
          <button onClick={()=>navigate(-1)}>go back</button>
        </div>
      </div>
    </div>
  )
}
