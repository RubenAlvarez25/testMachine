import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { idGen } from '../../utils/utils'
import axios from 'axios'
import { CreateOptionAnswer } from './CreateOptionAnswer';

const initialValues = {
  test_name: "",
  test_id: "",
  question_name: "",
  question_text: "",
  question_id: "",
  questions: [],
};

export const CreateQuestionOption = () => {
  const [question, setQuestion] = useState(initialValues)
  const [questions, setQuestions] = useState([])
  const [showOptions, setShowOptions] = useState(false)
 
  const {test_name,test_id} = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    let {name,value} = e.target
    setQuestion({...question,[name]:value,test_id:test_id,test_name:test_name})
  }

  const onSubmit = () => { 
    
    const data = {...question,question_id:idGen()}
    
    setQuestions([...questions,data])
    setQuestion(initialValues)
  }

  const aceptar = () =>{
    axios
    .post("http://localhost:4000/question/createQuestion",questions)

    .then((res)=>{console.log(res)
      navigate("/Success")

  })
    .catch((err)=>{console.log(err)})

  }

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <h3>
        Great !
      </h3>
      <p> now that you created the test, you need to fill it up with some questions, don't you think ?</p> 
      <p>This test needs to be respond by the user choosing an answer. Than means it is a "Choose one answer" kind of test </p>
      </div>
    </div>
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center jsutify-content-center">
        <h4>First, just name the question</h4>
        <input    
        type="text"
        placeholder='question'
        autoComplete='off'
        value={question.question_name}
        name='question_name'
        onChange={handleChange} 
        />   
        &nbsp;&nbsp;
        <h4>then just make a title to its sentence </h4>
        <input
        type="text"
        placeholder='title'
        autoComplete='off'
        value={question.question_text}
        name='question_text'
        onChange={handleChange} 
        />
        
        <p>you can make many questions and once you have it all... send it and finish</p>
      </div>
    </div>
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center jsutify-content-center">
        <button onClick={onSubmit} >Add to the list</button>
      </div>
    </div>{questions.map((e,index)=>{return(
    <div className="row">
          <div className="col-4 d-flex flex-column align-items-center jsutify-content-center">
          <h4>{e.question_name}</h4>
          <h5>{e.question_text}</h5>
          </div>
          <div className="col-4  d-flex align-items-center jsutify-content-center">
            <button onClick={()=>setShowOptions(!showOptions)} > add option</button>
          </div>
          <div className="col-4 d-flex align-items-center jsutify-content-center">
          {showOptions && 
          <CreateOptionAnswer 
          question_id={e.question_id}
          questions={questions}
          setQuestions={setQuestions}/>}
           </div>
    </div> 
       )})}
       <div className="row">
        <div className="col-12">
        <button 
           onClick={aceptar} 
         >Finalizar y enviar</button>
        </div>
       </div>
  </div>
  )
}
