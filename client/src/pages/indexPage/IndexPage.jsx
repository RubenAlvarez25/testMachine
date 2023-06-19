import React from 'react'
import { useNavigate } from 'react-router-dom'

export const IndexPage = () => {
    const navigate = useNavigate()
  return (
   <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center p-3">
                <h3>
                   Welcome to your Test Machine   
                </h3>
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-center p-3">
                <button onClick={()=>navigate("/CreateTest")}>CREATE YOUR TEST NOW</button>
            </div>
        </div>
       
    </div>
   </>
  )
}
