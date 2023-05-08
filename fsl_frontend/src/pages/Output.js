import React, { useEffect, useState, useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CTable, CTableDataCell, CTableHead, CTableBody, CTableHeaderCell, CTableRow, CTabContent, CTabPane, CNav, CNavLink, CNavItem, CLink, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton, CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilX, cilWeightlifitng } from '@coreui/icons'
import { DocsExample, PPStep } from '../components'

function Output(){

    const [visible, setVisible] = useState(true)
    const [processes, setProcesses] = useState([]);

    useEffect(() =>{
        loadProcesses();
    },[])

    //TODO : Replace POST with GET
    const loadProcesses = () => {
        const formData = new FormData();
        formData.append("loggedUser", localStorage.getItem("user"));
        fetch("http://localhost:5000/loadResults",{
            method: 'POST',
            body: formData})
        .then(res => res.json())
        .then(data =>{
            setProcesses(data.Success.slice());
            setVisible(false);
        })
    }

    const handleDelete = (processIndex) => {
        if (window.confirm('This process is to be deleted! Are you sure?')) {
            fetch(`http://localhost:5000/deleteProcess?processId=${encodeURIComponent(processIndex)}`,{
                method: 'DELETE'})
            window.location.reload();
        }
    };

    const downloadFile = (process) =>{
        const url_user = encodeURIComponent(localStorage.getItem("user"))
        const url_processName = encodeURIComponent(process.process_name)
        fetch(`http://localhost:5000/downloadFile?&user=${url_user}&processName=${url_processName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/zip',
        },})
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]),);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', process.process_name+`.zip`, );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <div class="d-grid gap-4">
                    <h1> Results </h1>
                    {visible && <span class="spinner-border spinner-border-sm" role="status" id="load_preprocess"></span>}
                    <div class="d-grid gap-4">
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Processname</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Download</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            {processes.map((process) => (
                                <CTableRow key={process.process_id}>
                                    <CTableDataCell>{process.process_name}</CTableDataCell>
                                    <CTableDataCell>{process.process_type}</CTableDataCell>
                                    <CTableDataCell>Now</CTableDataCell>
                                    <CTableDataCell><CButton color="link" onClick={() => downloadFile(process)}>Download</CButton></CTableDataCell>
                                    <CTableDataCell><CButton color="danger" shape="rounded-pill" variant="ghost" onClick={() => handleDelete(process.process_id)}><CIcon icon={cilX}/></CButton></CTableDataCell>
                                </CTableRow>))}
                            </CTableBody>
                        </CTable>
                    </div>
                </div>

            </CCol>
        </CRow>
    )
}

export default Output;