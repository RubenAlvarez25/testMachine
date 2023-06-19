import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Error = () => {
   const navigate = useNavigate()
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <h5>Oooops... you may come back </h5>  
            </div>
             <div className="col-12">
            <button onClick={()=>navigate("/")}>back to menu</button>
            </div>
        </div>
    </div>
    </>
  )
}
