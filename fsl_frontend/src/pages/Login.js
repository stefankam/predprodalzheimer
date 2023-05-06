import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CAlert, CButton,  CCard,  CCardBody,  CCardGroup,  CCol,  CContainer, CForm,  CFormInput, CInputGroup, CInputGroupText, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'

import { GoogleLogin } from '@react-oauth/google';

function Login() {

  const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    // <p className="text-medium-emphasis">Or sign in with Google</p>
                   // <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

  const nav =useNavigate();
  const [client_id, setUsername] = useState('')
  const [client_secret, setPassword] = useState('')
  const [alert_message, setAlertMsg] = useState('')
  const [alert_visible, setVisible] = useState(false);
  const [alert_color, setColor ] = useState('danger');
  const [userForget, setUserForget] = useState(true)

  const onSubmitClick = (e) => {
      e.preventDefault()
      let opts = {
        'client_id': client_id,
        'client_secret': client_secret
      }
      fetch("http://localhost:5000/login", {
        method: 'POST',
        body: JSON.stringify(opts)})
        .then(resp => resp.json())
        .then(resp =>{
          if ((resp.Empty_credentials) === true){
            setAlertMsg("Please enter a username and password")
            setVisible(true)
            setColor('warning')
          }else if ((resp.Authentication) === false){
            setAlertMsg("Password or username wrong!")
            setVisible(true)
            setColor('danger')
          }else if ((resp.Token) === false){
            setAlertMsg("Token expired!")
            setVisible(true)
            setColor('danger')
          }else{
            window.localStorage.setItem("token", resp.token);
            window.localStorage.setItem("auth", true);
            window.localStorage.setItem("user", resp.use_name);
            nav("/dashboard")
          }
        })
    }

    const askNewPassword= ()=> {
        nav("/requestPassword")
    }

  useEffect(() => {
    if (localStorage.getItem("auth") =="true" && localStorage.getItem("user")){
      nav("/dashboard")
    };
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CAlert color={alert_color} className="d-flex align-items-left" visible={alert_visible}>
                      <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                      <p>{alert_message}
                      </p>
                     </CAlert>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username"
                      autoComplete="username"
                      onChange={handleUsernameChange}
                      value={client_id}
                      data-testid = "username"/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={client_secret}
                      />
                      <p onClick={onSubmitClick} ></p>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <Link to="/dashboard">
                          <CButton color="primary" className="px-4" onClick={onSubmitClick} type="submit"> Login </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={askNewPassword}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow><br/>

                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}



export default Login