

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

/*import React, { useEffect, useState, useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CTabContent, CTabPane, CNav, CNavLink, CNavItem, CLink, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton, CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cliHamburgerMenu, cliX } from '@coreui/icons'
import { cilCloudDownload } from '@coreui/icons'
import { DocsExample, PPStep } from '../components'

function Output(){

    const [visible, setVisible] = useState(true)

    useEffect(() =>{
        const formData = new FormData();
        formData.append("loggedUser", localStorage.getItem("user"));
        fetch("http://localhost:5000/loadResults",{
            method: 'POST',
            body: formData})
        .then(res => res.json())
        .then(data =>{
            //console.log((data.Success).length)
            for (let i = 0; i <(data.Success).length; i++){
             addFile(data.Success[i],"Matrix")
            }
            setVisible(false);
        })
    },[])


    function addFile(selected_file,process_name){
                const deleteProcess = (e) => {
                    alert("Are you sure? The Process can't be recovered afterwards!");

                    fetch("http://localhost:5000/deleteProcess",{
                        method: 'DELETE'})
                }
            let table = document.getElementById("table");
            let newFile = document.createElement("tr");
            const currentDate = Date.now();
            let timestamp = new Date(currentDate);
            timestamp = timestamp.toLocaleTimeString();
            newFile.innerHTML = `<tbody class="table-group-divider">
                                    <tr>
                                        <td>${selected_file}</td>
                                        <td>${process_name}</td>
                                        <td>${timestamp}</td>
                                        <td><a href='https://www.w3schools.com' target="_blank">Download</a></td>
                                        <td><button onClick={deleteProcess}> X </button></td>
                                    </tr>
                                 </tbody>`;
            table.tBodies[0].appendChild(newFile);
    }



    return (
        <CRow>
            <CCol xs={12}>
                <div class="d-grid gap-4">
                    <h1> Results </h1>
                    {visible && <span class="spinner-border spinner-border-sm" role="status" id="load_preprocess"></span>}
                    <div class="d-grid gap-4">
                        <table class="table" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">Processname</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Timestamp</th>
                                    <th scope="col">Download</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider"></tbody>
                        </table>
                    </div>
                </div>
            </CCol>
        </CRow>
    )
}

export default Output*/