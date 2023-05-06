import React, { useState, useEffect }  from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from './components'
import { Link,useNavigate } from 'react-router-dom'

const DefaultLayout = () => {

  const nav =useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") =="false" || localStorage.getItem("user") ==null){
      nav("/login")
    }
  }, []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
