import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { CAvatar, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin, cifBr,  cifEs,  cifFr,  cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale} from '@coreui/icons'
import { Navigate } from "react-router-dom";


const Dashboard = () => {
/*   const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
      const loggedInUser = localStorage.getItem("auth");
      const userKnown = localStorage.getItem("user");
      if (loggedInUser && userKnown != null) {
        setAuthenticated(loggedInUser);
      }
    }, []);*/

    if (!localStorage.getItem("auth") || localStorage.getItem("auth") == false) {
        return <Navigate replace to="/login" />;}
    else {
        return (
        <>
        <CRow>
        <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">     </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
        <CCard className="mb-4">
            <CCardBody>
            </CCardBody>

          </CCard>
          </CCol>
          <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0"> EEG </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>

        <CCard className="mb-4">
            <CCardBody>
            {}

            </CCardBody>

          </CCard>
          </CCol>
        </CRow>
        <CRow>
        <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0"> NPT </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>

        <CCard className="mb-4">
            <CCardBody>
            </CCardBody>

          </CCard>
          </CCol>
          <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0"> Other? </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>

        <CCard className="mb-4">
            <CCardBody>
            </CCardBody>

          </CCard>
          </CCol>
          </CRow>
        </>

    )
  }
}

export default Dashboard
