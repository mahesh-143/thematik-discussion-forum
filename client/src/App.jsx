import SubmitPost from "./forms/SubmitPost"
import Header from "./layouts/Header"
import Signup from "./forms/Signup"
import Signin from "./forms/Signin"
import ForgotPassword from "./forms/ForgotPassword"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import WithoutSidebar from "./layouts/WithoutSidebar"
import WithSidebar from "./layouts/WithSidebar"
import { useDisclosure } from "@chakra-ui/react"
import AuthRoute from "./components/AuthRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import PostPage from "./pages/PostPage"
import CreateTheme from "./forms/CreateTheme"
import Themes from "./pages/Themes"
import ThemePage from "./pages/ThemePage"

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Header onOpen={onOpen} />

      <Routes>
        <Route element={<WithoutSidebar />}>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createtheme"
            element={
              <ProtectedRoute>
                <CreateTheme />
              </ProtectedRoute>
            }
            />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        <Route element={<WithSidebar isOpen={isOpen} onClose={onClose} />}>
          <Route path="/" element={<Home />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/themes/:id" element={<ThemePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
