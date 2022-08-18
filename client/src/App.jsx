import SubmitPost from "./forms/SubmitPost"
import Header from "./layouts/Header"
import Signup from "./forms/Signup"
import Signin from "./forms/Signin"
import {Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
    <Header />

    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/submit" element={<SubmitPost/>} />
    </Routes>
    </>
  )
}

export default App
