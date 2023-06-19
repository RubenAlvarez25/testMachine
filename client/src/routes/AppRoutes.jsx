import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreateTest } from '../pages/createTest/CreateTest'
import { CreateQuestionText } from '../pages/createQuestions/CreateQuestionText'
import { CreatePhotoQuestion } from '../pages/createPhotoQuestion/CreatePhotoQuestion'
import { CreateQuestionOption } from '../pages/createQuestionOption/CreateQuestionOption'
import { IndexPage } from '../pages/indexPage/IndexPage'
import { Success } from '../pages/interPages/Success'
import { Error } from '../pages/interPages/Error'


export const AppRoutes = () => {
  return (
   
    <BrowserRouter>
    <Routes>
    <Route path='/'element={<IndexPage />} />
    <Route path='*'element={<Error />} />
    <Route path='/createTest' element={<CreateTest />} />
    <Route path='/createQuestionText/:test_id/:test_name' element={<CreateQuestionText />} />
    <Route path='/CreatePhotoQuestion/:test_id/:test_name' element={<CreatePhotoQuestion />} />
    <Route path='/CreateQuestionOption/:test_id/:test_name' element={<CreateQuestionOption />} />
    <Route path='/Success' element={<Success />} />
    </Routes>
    </BrowserRouter>
  
  )
}
