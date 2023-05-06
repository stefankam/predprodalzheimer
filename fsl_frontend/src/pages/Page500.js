import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page500 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">Not yet...</h1>
              <h4 className="pt-3">but soon!</h4>
              <p className="text-medium-emphasis float-start">
                This functionality will soon be implemented
              </p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500

/*
/           <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>


import React, { useEffect, useState, useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep';
import { CTabContent, CCollapse, CFormCheck, CCloseButton, CListGroup, CListGroupItem, CTabPane, CNav, CNavLink, CNavItem, CLink, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton, CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cliHamburgerMenu } from '@coreui/icons'
import { FileSelector } from '../components'

function Analysis(){
    const [counter, setCounter] = useState(1)
    const [file, setFile] = useState()
    const [multipleICA, setMultipleICA] = useState(Array({number:counter,filename:null}))//useState(Array.apply(null, Array(counter)).map(function () {}))
    const icaFiles = React.useRef(null)
    const fileComp = <CListGroupItem> <FileSelector/></CListGroupItem>
    //const nComps = duplicate(oneComp, counter)


    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    function addICAFile(){
        setCounter(counter+1);
        setMultipleICA([...multipleICA,{number:counter+1,filename:null}]);
    }

    function startMelodic(){
        let data = new FormData();
        let fileList = createInputList();
        for(let i = 0; i < fileList.length; i++){
            data.append("fileList", fileList[i]);
        }
        fetch('http://localhost:5000/melodic', {
            method: 'POST',
            body: data})
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }

    function createInputList(){
        let inputFiles = []
        for(let i=0; i < icaFiles.current.childElementCount; i++){
            let file = icaFiles.current.childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].files[0]
            if ( typeof (file) !== "undefined"){
                inputFiles.push(file)
            }
        }
        return inputFiles;
    }

    function startMelodicGroup(){
        let data = new FormData();
        let fileList = createInputList();
        for(let i = 0; i < fileList.length; i++){
            data.append("fileList", fileList[i]);
        }
        fetch('http://localhost:5000/melodic', {
            method: 'POST',
            body: data})
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }

    const delICAFile = (e) => {
       if (e.target.type == "button"){
        let currentListItem = e.target.parentNode.parentNode.parentNode.parentNode;

        setCounter(counter-1);
        const newList = [...multipleICA]
        newList.splice(currentListItem.id-1,1)
        let i;
        for(i=0; i < counter-1; i++){
            newList[i].number = i+1;
            console.log(newList[i])
        }
        currentListItem.remove()
        //setMultipleICA(newList)
        }
    }




            /// COMMENTS TO DELETE ////
            //currentListItem.id
            //let eToDelete = cloneDeep(currentListItem.id)
//          const newList = multipleICA.filter((item) => item.number != eToDelete);
            //console.log(currentListItem.id === eToDelete, "original", currentListItem.id, "clicked", eToDelete)
            */
/*            let eToDelete = currentListItem.id
            const newList = [...multipleICA]
            newList.splice(eToDelete-1,1)
            let i;
            for(i=0; i < counter-1; i++){
                newList[i].number = i+1;
//                try{
//                    let str = currentListItem.parentNode.childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].files[0].name
//                    let filename = str.slice()
//                    newList[i].filename = filename
//                } catch (error){
//                    newList[i].filename = null;
//                }
            }
            setMultipleICA(newList)*//*

            /// COMMENTS TO DELETE ////

    return (
        <CRow>
            <CCol xs={12}>
                <h1> FSL Nets Analysis </h1>

                <br></br>
                <div class="row">
                    <div class="col-11 ">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-1">
                                        <div class="avatar rounded bg-primary text-white">1</div>
                                    </div>
                                    <div class="col-10">
                                        <div class="form-check form-switch form-switch-xl">
                                           <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultXl" />
                                           <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Node definition</b></label><br></br>
                                           <i>Using Multivariate Exploratory Linear Optimised Decomposition into Independent Components (Melodic)</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <br></br>
                                <div class="col-10">
                                    <div>
                                       <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Single subject ICA"/>
                                       <CCollapse visible>
                                              <CCard >
                                                <CCardBody>
                                                    <CFormLabel htmlFor="formFile">Select file to be analysed</CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput onChange={onFileChange} type="file" id="input_file" name="file"/>
                                                        <div class="invalid-feedback">
                                                          Please select a file.
                                                        </div>
                                                    </CInputGroup>
                                                </CCardBody>
                                              </CCard>
                                            </CCollapse>
                                            <br></br>
                                        <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Group level ICA" />
                                        <CCollapse visible>
                                         <CListGroup ref={icaFiles} display="flex">
                                            {multipleICA.map((x) => <CListGroupItem id={x.number} onClick={delICAFile}><FileSelector number={x.number} file={x.file} /></CListGroupItem> )}
                                         </CListGroup>
                                        <br/>
                                        <CContainer>
                                          <CRow className="align-items-start">
                                            <CCol class="col-1"><CButton variant="ghost" color="success" onClick={addICAFile} >+</CButton></CCol>
                                          </CRow>
                                        </CContainer>
                                       </CCollapse>
                                      <br></br>
                                    </div>
                                </div>
                                <CContainer>
                                  <CRow className="align-items-start">
                                    <CCol class="col-3"><CButton onClick={startMelodicGroup} >Start node definition</CButton></CCol>
                                  </CRow>
                                </CContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    <div class="col-11">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-1">
                                        <div class="avatar rounded bg-primary text-white">2</div>
                                    </div>
                                    <div class="col-10">
                                        <div class="form-check form-switch form-switch-xl">
                                           <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultXl" />
                                           <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Extract timeseries from nodes </b></label><br></br>
                                           <i> Using Dual Regression</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <CFormLabel htmlFor="formFile">Select file to be analysed</CFormLabel>
                                <CInputGroup >
                                    <CFormInput onChange={onFileChange} type="file" id="input_file" name="file"/>
                                    <div class="invalid-feedback">
                                      Please select a file.
                                    </div>
                                </CInputGroup>
                                <br></br>
                                <div class="col-10">
                                How many parameters are expected?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    <div class="col-11">
                        <div class="card" disabled>
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-1">
                                        <div class="avatar rounded bg-primary text-white">3</div>
                                    </div>
                                    <div class="col-10">
                                        <div class="form-check form-switch form-switch-xl">
                                           <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultXl" />
                                           <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Create node images </b></label><br></br>
                                           <i> Using Dual Regression</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>
            </CCol>
        </CRow>
    )
}

export default Analysis
*/

