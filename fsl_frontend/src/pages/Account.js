import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { CTabContent, CTabPane, CNav, CFormTextarea, CNavLink, CNavItem, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton,  CCard,  CCardBody,  CCardGroup,  CContainer, CForm,  CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import { DocsExample } from '../components'
// <DocsExample href="components/accordion"> <CFormInput type="file" id="formFile" onChange={onFileChange}/>

function Account(){

  const navigate = useNavigate();
  const logout = (e) => {
    if (window.confirm('You are about to get logged out! Are you sure?')) {
      localStorage.setItem("auth", false)
      localStorage.setItem("token", null)
    window.localStorage.setItem("user", null);
      navigate("/login")
    }
  }


  return (
    <CRow>
      <CCol xs={12}>
            <h1> Your account</h1>
         <CButton onClick={logout}>Logout</CButton>
      </CCol>
    </CRow>
  )
}

export default Account;
