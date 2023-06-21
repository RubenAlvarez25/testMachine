import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  user_id: 1
}

export const IndexPage = () => {
    const navigate = useNavigate()
    const [tests, setTests] = useState([])
    const [user, setUser] = useState(initialValues)

    useEffect(() => {
        axios
          .get("http://localhost:4000/test/allTest")
          .then((res) => {
            setTests(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const delTest = (id) => {
        axios
          .delete(`http://localhost:4000/test/deleteTest/${id}`)
          .then((res) => {
            setTests(tests.filter((elem) => elem.test_id !== id));
          })
          .catch((err) => {
            console.log(err);
          });
      };  
    
  return (
   <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center p-3">
                <h3>
                   Welcome to your Test Machine   
                </h3>
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-center p-1">
                <button onClick={()=>navigate("/CreateTest")}>CREATE YOUR TEST NOW</button>
            </div>
        </div> 
        {/* TEST LIST */}
        {tests.map((e,i)=>{return(
        <div className="row">
            <div key={i} className="col-6 d-flex flex-column justify-content-center align-items-center p-1">
               <h2> {e.test_name} </h2>
            </div>
          {/* BUTTON GO TO TEST */}
             <div className="col-6 d-flex justify-content-evenly align-items-center p-1">
            <button onClick={()=>{e.type === 1 ? navigate (`/TestShortAnswer/${e?.test_id}/${e?.test_name}`): navigate (`/TestOptionsAnswer/${e.test_id}/${e?.test_name}`)}}> Go to test </button>
          {/* BUTTON GO TO RESULT */}
            <button onClick={()=>{e.type === 1 ? navigate (`/ShortAnswerResults/${e?.test_id}/${user.user_id}`): navigate (`/OptionAnswerResults/${e.test_id}/${user.user_id}`)}}> Go to resuts </button>
          {/* DEL TEST */}
            <button onClick={()=>delTest(e.test_id)}>X</button>
            </div>   
            <hr />
         </div>   
         )})} 
    </div>
   </>
  )
}
