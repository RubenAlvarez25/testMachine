import React, { useState } from 'react'
import { idGen } from '../../utils/utils'

const initialValue = {
    option_test_name: "",
    question_option_id:  "",
    question_id: "" 
}

export const CreateOptionAnswer = ({question_id,questions,setQuestions,}) => {
    const [opciones, setOpciones] = useState([])
    const [opcion, setOpcion] = useState(initialValue)
    const [reset, setReset] = useState("")
    const [show, setShow] = useState(false)


    const handleChange = (e) => {
        setOpcion({ ...opcion, option_test_name: e.target.value });
      };

   const addOption = () => {

        let objetoProvisional = {...opcion,question_option_id:idGen(),question_id:question_id}

        let arrayProvisional = [...opciones,objetoProvisional]

        setOpciones(arrayProvisional)

        let resFinal = [...questions]
        resFinal.map((elem)=>{
        if(elem.question_id === question_id){
            elem.questions = [... elem.questions,objetoProvisional]
        }
        setOpcion({...opcion})
    })

    setQuestions(resFinal)
    setReset("")
   
}


const delOption = (i) => {
    let arrayPrueba = [...opciones];

    let arrayFinal = arrayPrueba.filter(
      (elem) => elem.question_option_id !== i
    );
    setOpciones(arrayFinal);

    let resFinal = [...questions];
    resFinal.map((elem) => {
      if (elem.question_id === question_id) {
        elem.questions = arrayFinal;
      }
    });
    setQuestions(resFinal);
  };


  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
            <input 
            value={opcion.option_test_name} 
            placeholder="possible answers"
            onChange={handleChange} 
            />
            &nbsp; &nbsp;
            <button 
            onClick={addOption}>
            add answers</button>
            </div>
        </div>
        {opciones.map((e)=>{return(
        <div className="row">
            <div className="col-6">
            <h5>{e.option_test_name}</h5>
            </div>
            <div className="col-6">
            <button onClick={() => delOption(e.question_option_id)}
            >X</button>               
            </div>

        </div>
        )})}
        
            
         
        </div>
    
  )
}
