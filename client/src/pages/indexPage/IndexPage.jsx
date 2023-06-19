import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const IndexPage = () => {
    const navigate = useNavigate()
    const [tests, setTests] = useState([])

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
        <div className="row">
         {tests.map((e,i)=>{return(
            <>
            <div key={i} className="col-6 d-flex flex-column justify-content-center align-items-center p-1">
               <h2> {e.test_name} </h2>
            </div>

             <div className="col-6 d-flex justify-content-evenly align-items-center p-1">
            <button onClick={()=>{e.type === 1 ? navigate (`/TestShortAnswer/${e?.test_id}`):e?.type === 2 ? navigate (`/TestOptionsAnswer/${e.test_id}`): navigate(`/TestOptionsImage/${e?.test_id}`)}}> Go to test </button>
            <button onClick={()=>delTest(e.test_id)}>X</button>
            </div>   
            <hr />
            </>
         )})}
        </div>
    </div>
   </>
  )
}
