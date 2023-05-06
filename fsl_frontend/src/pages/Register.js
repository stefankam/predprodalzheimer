import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'

const Register = () => {
  const nav =useNavigate();
  const [user_name, setUsername] = useState('')
  const [user_mail, setMail] = useState('')
  const [user_password, setPassword] = useState('')
  const [alert_visible, setVisible] = useState(false)
//  const [alert_visible, setVisible] = useState(false);
//  const [alert_color, setColor ] = useState('danger')

  const onSubmitClick = (e) => {
      e.preventDefault()
      fetch(`http://localhost:5000/user_exists?username=${encodeURIComponent(user_name)}`, {
        method: 'GET'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            if (data.user == 1){
                setVisible(true)
                //TODO - handle already existing username
                }
            else {
                //TODO - check if password okay (2x)
               let opts = {
                    'user_name': user_name,
                    'user_password': user_password,
                    'user_mail' : user_mail
                }
               fetch("http://localhost:5000/register", {
                method: 'POST',
                body: JSON.stringify(opts)})
                .then(resp => resp.json())
                .then(data => console.log(data))
            }
        })
  }

    useEffect(() =>{
        fetch(`http://localhost:5000/user_exists?username=${encodeURIComponent(user_name)}`, {
                method: 'GET'})
                .then(resp => resp.json())
                .then(data => {
                    data.user == 0 ? setVisible(false): setVisible(true)
                })
    },[user_name])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleMailChange = (e) => {
    setMail(e.target.value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CAlert color="danger "className="d-flex align-items-left" visible={alert_visible}>
                      <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                      <p>Uups, looks like this user already exists.
                      </p>
                     </CAlert>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                     placeholder="Username"
                     autoComplete="username"
                     onChange={handleUsernameChange}
                     value={user_name}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">@</CInputGroupText>
                    <CFormInput placeholder="e-Mail"
                                onChange={handleMailChange}
                                value={user_mail}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    onChange={handlePasswordChange}
                    value={user_password}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={onSubmitClick} type="submit" disabled={alert_visible}>Create Account</CButton>
                  </div>
                </CForm>
                <CCol xs={6} >
                  <Link to="/login">
                    <CButton color="link" className="px-0" to="/login"> Back to Login </CButton>
                  </Link>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
