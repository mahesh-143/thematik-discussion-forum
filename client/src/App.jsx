import SubmitPost from "./forms/SubmitPost"
import Header from "./layouts/Header"
import Signup from "./forms/Signup"
import Signin from "./forms/Signin"
import ForgotPassword from "./forms/ForgotPassword"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import WithoutSidebar from "./layouts/WithoutSidebar"
import WithSidebar from "./layouts/WithSidebar"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route element={<WithoutSidebar />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/submit" element={<SubmitPost />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        <Route element={<WithSidebar />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
