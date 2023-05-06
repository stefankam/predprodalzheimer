import React, { useState, useEffect } from 'react'
import { Link,useNavigate, useLocation} from 'react-router-dom'
import { CAlert, CButton,  CCard,  CCardBody,  CCardGroup,  CCol,  CContainer, CForm,  CFormInput, CInputGroup, CInputGroupText, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'

import { GoogleLogin } from '@react-oauth/google';

function RequestPassword() {

    const nav =useNavigate();

  const [mail, setMail] = useState('')
  const handleMailChange = (e) => {
    setMail(e.target.value)
  }
    const requestPassword = (e) => {
      e.preventDefault()
      fetch(`http://localhost:5000/mail_exists?mail=${encodeURIComponent(mail)}`, {
        method: 'GET'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data.user)
            if (data.user == 1){
             fetch(`http://localhost:5000/askPassword?mail=${encodeURIComponent(mail)}`)
                .then(resp => resp.json())
                .then(data => {
                    localStorage.setItem("reset_token", data.Res_Tok)
                    localStorage.setItem("mail", mail)
                    alert("An email with the link to reset your password was just sent!")
                    nav("/login");
                })
             }else{
                if (window.confirm('No user has been created with this account. Do you want to register?')) {
                    nav("/register")
                }
             }
        })
    }

	return (
	<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4" name="card1">
                <CCardBody>
                <CButton color="link" className="px-0" onClick={() => nav("/login")}>
                  Return to login
                </CButton>
	                <CForm>
                    <h1>Request a new password</h1>
                    <p className="text-medium-emphasis">Please enter your mail adress you used for registration</p>
                    <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">@</CInputGroupText>
                      <CFormInput placeholder="Mail"
                      autoComplete="mail"
                      onChange={handleMailChange}
                      value={mail} />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <Link to="/dashboard">
                          <CButton color="primary" className="px-4" onClick={requestPassword} type="submit"> Request new password </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                    </CForm>
                   </CCardBody>
                </CCard>
              </CCol>
        </CRow>
      </CContainer>
    </div>
	);
}

export default RequestPassword