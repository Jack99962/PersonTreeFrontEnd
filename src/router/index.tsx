import { createBrowserRouter } from "react-router-dom"
import IndexPage  from "../pages/Index"
import LoginPage  from "../pages/Login"
import Layout from "../layout"

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <IndexPage />,
        index: true
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

