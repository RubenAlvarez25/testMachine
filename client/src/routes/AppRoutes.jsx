import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreateTest } from '../pages/createTest/CreateTest'
import { CreateQuestionText } from '../pages/createQuestions/CreateQuestionText'
import { CreateQuestionOption } from '../pages/createQuestionOption/CreateQuestionOption'
import { IndexPage } from '../pages/indexPage/IndexPage'
import { Success } from '../pages/interPages/Success'
import { Error } from '../pages/interPages/Error'
import { TestShortAnswer } from '../pages/testShortAnswer/TestShortAnswer'
import { TestOptionsAnswer } from '../pages/testOptionsAnswer/TestOptionsAnswer'
import { ShortAnswerResults } from '../pages/showResults/ShortAnswerResults'
import { OptionAnswerResults } from '../pages/showResults/OptionAnswerResults'
import { TestComplete } from '../pages/interPages/TestComplete'



export const AppRoutes = () => {
  return (
   
    <BrowserRouter>
    <Routes>
    <Route path='/'element={<IndexPage />} />
    <Route path='*'element={<Error />} />
    <Route path='/Success' element={<Success />} />
    <Route path='/TestComplete' element={<TestComplete />} />
     
    {/* Test creation */}
    <Route path='/createTest' element={<CreateTest />} />
    <Route path='/createQuestionText/:test_id/:test_name' element={<CreateQuestionText />} />
    <Route path='/CreateQuestionOption/:test_id/:test_name' element={<CreateQuestionOption />} />
 
    {/* Test cumpliment */}
    <Route path='/TestShortAnswer/:test_id/:test_name' element={<TestShortAnswer />}/>
    <Route path='/TestOptionsAnswer/:test_id/:test_name' element={<TestOptionsAnswer />}/>


    {/* Show results */}
    <Route path='/ShortAnswerResults/:test_id/:user_id' element ={<ShortAnswerResults />} />
    <Route path='/OptionAnswerResults/:test_id/:user_id' element ={<OptionAnswerResults />} />
    </Routes>
    </BrowserRouter>
  
  )
}
