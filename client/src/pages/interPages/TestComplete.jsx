import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TestComplete = () => {
    const navigate = useNavigate()
    return (
      <>
          <div className="container-fluid">
              <div className="row">
                  <div className="col-12">
                   <h2>
                  Congratulations, YOU FINISHED A TEST
                  </h2> 
                  <button>Go to all test</button>
                  <button onClick={()=>navigate("/")}>Go to menu</button>   
                  </div>
              </div>
          </div>
      </>
    )
}
