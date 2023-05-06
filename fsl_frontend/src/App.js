/*
import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

// Pages
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Page404 = React.lazy(() => import('./pages/Page404'))
const Page500 = React.lazy(() => import('./pages/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
*/

import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Request = React.lazy(() => import('./pages/RequestPassword'))
const Reset = React.lazy(() => import('./pages/ResetPassword'))
const Page404 = React.lazy(() => import('./pages/Page404'))
const Page500 = React.lazy(() => import('./pages/Page500'))



class App extends Component {
  render() {

    return (
    <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/requestPassword" name="Request Password Page" element={<Request />} />
            <Route exact path ="/resetPassword/:token" name="Reset Password Page" element={<Reset />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
          </Routes>
        </Suspense>
     </BrowserRouter>
    )
  }
}

export default App;