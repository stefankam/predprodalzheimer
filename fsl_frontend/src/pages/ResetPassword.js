import React, { useState, useEffect } from 'react'
import { Link,useNavigate, useLocation, useParams} from 'react-router-dom'
import { CAlert, CButton,  CCard,  CCardBody,  CCardGroup,  CCol,  CContainer, CForm,  CFormInput, CInputGroup, CInputGroupText, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'

import { GoogleLogin } from '@react-oauth/google';

function ResetPassword() {

        const nav =useNavigate();
        const params= useParams()

        useEffect(() => {
          const reset_token = params.token
          const mail = localStorage.getItem("mail") //should be user name
          fetch(`http://localhost:5000/checkResetToken?reset_token=${encodeURIComponent(reset_token)}&mail=${encodeURIComponent(mail)}`, {
            method: 'GET'})
            .then(resp => resp.json())
            .then(data => {
            console.log(data)
            if (data.Token == false){
                alert("Your token is not valid!")
                const reset_token = localStorage.removeItem("reset_token")
                nav("/Login")
            }
        })
        }, []);
        const [password, setPassword] = useState('')
        const handlePasswordChange = (e) => {
          setPassword(e.target.value)
        }
        const [passwordCopy, setPasswordCopy] = useState('')
        const handlePasswordCopyChange = (e) => {
          setPasswordCopy(e.target.value)
        }

        const submitPassword = (e) =>{
            e.preventDefault();
            if(password == passwordCopy){
                const formData = new FormData();
                formData.append("newPassword", password);
                fetch('http://localhost:5000/resetPassword', {
                    method: 'PUT',
                    body: formData})
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.Success)
                    alert("Your password was successfully updated!")
                    nav("Login")
                })
            }
        }

	    return (
	        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4" name="card1">
                <CCardBody>
	                <CForm>
                    <h1>Reset password</h1>
                    <p className="text-medium-emphasis">Please enter your new password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput placeholder="New Password"
                      autoComplete="password"
                      type="password"
                      onChange={handlePasswordChange}
                      value={password}/>
                    </CInputGroup>
                    <p className="text-medium-emphasis">Confirm your new password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput placeholder="Repeat new Password"
                      autoComplete="password"
                      type="password"
                      onChange={handlePasswordCopyChange}
                      value={passwordCopy}/>
                    </CInputGroup><br/>
                    <CRow>
                      <CCol>
                        <Link to="/dashboard">
                          <CButton color="primary" className="px-4" onClick={submitPassword} type="submit"> Confirm new password </CButton>
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
	    )}


export default ResetPassword