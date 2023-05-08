import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { CAvatar, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin, cifBr,  cifEs,  cifFr,  cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale} from '@coreui/icons'
import { Navigate } from "react-router-dom";
import  ReactPlayer from 'react-player';

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
            <h4 id="traffic" className="card-title mb-0"> Do not know how this application works?</h4>
            <div className="small text-medium-emphasis">Watch the instructional video!</div>
            <div>
                <ReactPlayer url='<https://www.youtube.com/watch?time_continue=25&v=1vzFk6Napjw&embeds_euri=https%3A%2F%2Fwww.google.com%2F&source_ve_path=Mjg2NjY&feature=emb_logo>' />
            </div>
          </CRow>
          <br/>
           <CRow>
            <h4 id="traffic" className="card-title mb-0"> You do not know what a brain connectivity matrix is?</h4>
            <div className="small text-medium-emphasis">Watch the instructional video from FSL!</div>
            <div>
                <ReactPlayer url='<https://www.youtube.com/watch?time_continue=25&v=1vzFk6Napjw&embeds_euri=https%3A%2F%2Fwww.google.com%2F&source_ve_path=Mjg2NjY&feature=emb_logo>' />
            </div>
          </CRow>
        </>

    )
  }
}

export default Dashboard
