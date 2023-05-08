import React, { useEffect, useRef, useState } from 'react'
//import useState from 'react-usestateref'
import { Link,useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep';
import { CAlert, CTabContent, CCollapse, CFormCheck, CCloseButton, CListGroup, CListGroupItem, CTabPane, CNav, CNavLink, CNavItem, CLink, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton, CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cliHamburgerMenu,cilWarning } from '@coreui/icons'
import { FileSelector } from '../components'


function Analysis(){


/**/
    //const [params, setParams] = useState({approach : "concat", bg_threshold : null, mask : null, no_bet : true, no_mask : true, tr_sec : 0.0,})
    const [form, setForm] = useState({mask:"0", normal: true, corr:"corr"})
    const onFormChange = (e) => {
        setForm({ ...form,[e.target.name]: e.target.value,});
    }

    const [uniqueName, setUniqueName] = useState(false)
    const [processName, setProcessName] = useState()
    const onProcessNameChange = (e) => {
        setProcessName(e.target.value)
    }
    useEffect(() =>{
            if (processName != null){
                const url_user = localStorage.getItem("user");
                fetch(`http://localhost:5000/checkProcessName?user=${encodeURIComponent(url_user)}&processName=${encodeURIComponent(processName)}`, {
                    method: 'GET'})
                .then((res) => res.json())
                .then((data) => {
                    data.res == true ? setUniqueName(false) :setUniqueName(true)
                })
            }
    },[processName])

    const [fMRIFile, setfMRIFile] = useState()
    const [tr, setTr] = useState(0.0)
    const [currentAutoTr, setCurrentAutoTr] = useState(0.0)
    const [customCurrentTr, setCurrentCustomTr] = useState(0.0)
    const changeTr = (e)=> {
        if (e.target.checked){
            hideTr(false);setTr(customCurrentTr);
        }else{
            hideTr(true);setTr(currentAutoTr);}
    }

    const onfMRIFileChange = (e) => {
        setfMRIFile(e.target.files[0])
    }

    useEffect(() =>{
        setTr(()=>{
            if (fMRIFile != null){
                const formData = new FormData();
                formData.append("fMRIFile", fMRIFile);
                fetch('http://localhost:5000/get_tr', {
                    method: 'POST',
                    body: formData})
                .then((res) => res.json())
                .then((data) => {
                    setTr(data.TR)
                    setCurrentAutoTr(data.TR)
                })
            }
        })
    },[fMRIFile])

    const [hiddenTr, hideTr] = useState(true)
    const [hiddenAutoNodes, hideAutoNodes] = useState(true);

    const [customNbNodes, setCustomNbNodes] = useState(100);
    const changeNbNodes = (e)=> {
        if (e.target.checked){
            hideAutoNodes(true); delete form.nbNodes;
        }else{
            hideAutoNodes(false); form.nbNodes = parseInt(customNbNodes)}
    }

    const [maskFile, setMaskFile] = useState()
    const onMaskFileChange = (e) =>{
        setMaskFile(e.target.files[0]);
        form.mask = maskFile
    }
    const [hiddenMask, hideMask] = useState(true)
    const [melodicMask, setMelodicMask] = useState()
    const onMaskChange = (e) =>{
        if (e.target.value == "3"){
            hideMask(false); form.mask = maskFile
        } else{
            hideMask(true); form.mask = e.target.value
        }
    }

    const changeBet = (e) =>{
        if (e.target.checked){
            form.bet = (e.target.checked)
        }else{
            delete form.bet
        }
    }

    const [customPerm, setCustomPerm] = useState(3)
    const onNbPermChange = (e) => {
        if (e.target.value == "customPerm"){
            form.nbPerm = customPerm}
        else{
            form.nbPerm = e.target.value
        }
    }

    const [visible, setVisible] = useState(false);
    const [disabled_value, setDisabled] = useState(false);
    useEffect(() => {
            if (localStorage.getItem("matrix_running") == "true"){
                setVisible(true);
                setDisabled(true);
                var mat_running = setInterval(() => {
                if (localStorage.getItem("matrix_running") == "true"){
                    setVisible(true);
                    setDisabled(true);
                }else{
                    setVisible(false);
                    setDisabled(false);
                    clearInterval(mat_running);}
                },1000)
            }else{
                setVisible(false);
                setDisabled(false);}
            setTimeout(function(){
                clearInterval(mat_running);
                setVisible(false);
                setDisabled(false);
            },50000) //
    },[]);

    const [matrix, setMatrix] = useState([]);
    const [saved, setSaved] = useState([]);

    //Start to generate matrix
    const generateMatrix = (e) => {
        e.preventDefault();
        window.localStorage.setItem("matrix_running", true);
        const formData = new FormData();
        formData.append("fMRIFile", fMRIFile);
        formData.append("processName", processName);
        formData.append("TR", tr);
        formData.append("username", localStorage.getItem("user"));

        for (var i = 0; i<Object.keys(form).length;i++){
            formData.append(Object.keys(form)[i],form[Object.keys(form)[i]])
        }
        console.log(formData)
        fetch('http://localhost:5000/brainMatrix', {
            method: 'POST',
            body: formData})
        .then((res) => res.json())
        .then((data) => {
            window.localStorage.removeItem("matrix_running");
            alert(data.Success)
        })

            //const zipFile = data.zip
/*            setProcessName(null)
            const formData2 = new FormData();
            formData2.append("username", localStorage.getItem("user"));
            formData2.append("zipPath", zipFile);
            formData2.append("processName", processName);
            fetch('http://localhost:5000/saveProcess', {
                method: 'POST',
                body: formData2})
            .then((res) => res.json())
            .then((data) => {
                window.localStorage.removeItem("matrix_running");
                //window.location.reload(false);
                })
            .catch((err) => {
                window.localStorage.removeItem("matrix_running");

                console.log(err)
                })
            })*/
/*        Promise.all([
            //Sends request to generate the matrix, and then to save the generated matrix to the user logged in
            fetch('http://localhost:5000/brainMatrix', {
                method: 'POST',
                body: formData}),
            fetch('http://localhost:5000/saveProcess', {
                method: 'POST'})
        ])
        .then(([resMatrix, resStored]) => Promise.all([resMatrix.json()],[resStored.json()]))
        .then(([dataMatrix, dataStored]) => {
            alert(dataMatrix.Success)
            setProcessName(null)
            window.localStorage.removeItem("matrix_running");
            })*/
        .catch((err) => {
            console.log(err)
            alert("Uuups, something went wrong!")
            window.localStorage.removeItem("matrix_running");
        })
    }


    return (
        <CRow >
            <CCol xs={14}>
                <form onSubmit={generateMatrix}>
                <h1> FSL Nets Analysis </h1>
                <CFormLabel htmlFor="formFile">Please select your functional MRI </CFormLabel>
                <CInputGroup>
                  <CFormInput onChange={onfMRIFileChange} type="file" id="input_file" name="fMRIFile" required/>
                  <div class="invalid-feedback">Please select a file.</div>
                </CInputGroup>
                <br/>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" onChange={changeTr}></input>
                  <label class="form-check-label" for="flexSwitchCheckChecked">Use custom TR (detected TR : {tr})</label>
                </div>
                <CCol sm={1}>
                    <CFormInput type="number" step="any" hidden={hiddenTr} onChange={e => {setTr(e.target.value); setCurrentCustomTr(e.target.value)}} required={!hiddenTr} />
                </CCol><br/>
                <CAlert color="danger" className="d-flex align-items-left" visible={uniqueName}>
                     <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />Please choose another process name, this one already exists.
                 </CAlert>
                <CFormLabel class="form-label">Name this process</CFormLabel>
                <CFormInput onChange={onProcessNameChange} type="text" class="form-control" name="process_name"  value={processName} required />
                <div class="invalid-feedback">Please choose a name for this preprocess</div>
                <br/>
                <i>By simply clicking on the button --Generate Connectivity Matrix--  all default parameters will be used.</i>
                <CAccordion>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader><h5>1 - Node definition</h5></CAccordionHeader>
                        <CAccordionBody>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" defaultChecked="true" onChange={changeNbNodes}></input>
                                <label class="form-check-label" for="flexSwitchCheckChecked">Automatic estimation of nodes </label>
                            </div>
                            <CInputGroup hidden={hiddenAutoNodes}>
                                <CFormLabel className="col-sm-2 col-form-label"> <b>Number of nodes desired :</b></CFormLabel>
                                <CCol sm={2} onChange={onFormChange}>
                                    <CFormInput type="number" name="nbNodes" required={!hiddenAutoNodes} defaultValue={form.nbNodes} onChange={e => setCustomNbNodes(e.target.value)}/>
                                </CCol>
                            </CInputGroup>
                            <br/>
                            <CFormLabel class="form-label"><b>Please select the mask you want to use:</b></CFormLabel>
                            <select class="form-select form-select-md mb-3" name="mask" onChange={onMaskChange}>
                              <option value="0" >none</option>
                              <option value="1" >FSL standard MNI152_T1_2mm_brain_mask.nii.gz</option>
                              <option value="2">FSL standard MNI152_T1_1mm_brain_mask.nii.gz</option>
                              <option value="3">Personal mask file</option>
                            </select>
                            <div hidden={hiddenMask} required={!hiddenMask}>
                                <CFormLabel htmlFor="formFile">Please upload your mask</CFormLabel>
                                <CInputGroup>
                                  <CFormInput onChange={onMaskFileChange} type="file" name="maskFile" />
                                  <div class="invalid-feedback">Please select a file.</div>
                                </CInputGroup>
                             </div><br/>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" role="switch" name="bet" value={form.bet} onChange={changeBet}></input>
                              <label class="form-check-label" for="flexSwitchCheckChecked">Use BET</label>
                            </div>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                        <CAccordionHeader><h5>2 - Timeseries extraction</h5></CAccordionHeader>
                        <CAccordionBody>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" role="switch" name="norm" defaultChecked="true" onChange={e => form.norm = e.target.checked}></input>
                              <label class="form-check-label" for="flexSwitchCheckChecked" >Do you want to variance-normalise the timecourses used as the stage-2 regressors? </label>
                            </div><br/>
                            <div>
                                <CFormLabel ><b>Number of permutations to randomis</b></CFormLabel>
                                <CInputGroup >
                                    <CFormCheck inline type="radio" name="nbPerm" value="0" onChange={onNbPermChange} label="Raw stats" defaultChecked/>
                                    <CFormCheck inline type="radio" name="nbPerm" value="1" onChange={onNbPermChange} label="No randomisation" />
                                    <CFormCheck inline type="radio" name="nbPerm" value="customPerm" onChange={onNbPermChange} label="Custom number of permutations"/>
                                    <CCol sm={1}>
                                        <CFormInput type="number" defaultValue={customPerm} onChange={e => {setCustomPerm(e.target.value); if (form.nbPerm !== "0" && form.nbPerm !== "1"){form.nbPerm = e.target.value}}}/>
                                    </CCol>
                                </CInputGroup>
                            </div>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader><h5>3 - Brain connectivity matrix</h5></CAccordionHeader>
                        <CAccordionBody>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" role="switch" name="normal" onChange={onFormChange} defaultChecked="true"></input>
                              <label class="form-check-label" for="flexSwitchCheckChecked">Apply normalisation</label>
                            </div><br/>
                            <CFormLabel class="form-label"><b>How should be built?</b></CFormLabel>
                            <select class="form-select form-select-md mb-3" name="corr" onChange={onFormChange}>
                              <option value="corr" selected>Full correlation (normalised covariances) <em>(default)</em></option>
                              <option value="cov">Covariance (with variances on diagonal)</option>
                              <option value="amp">Amplitudes only - no correlations (just the diagonal)</option>
                              <option value="icov">Partial correlation</option>
                              <option value="ridegep">Ridge Regression partial, with rho=0.1</option>
                              <option value="pwling">Hyvarinen pairwise causality measure</option>
                            </select>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" role="switch" name="r2z" onChange={e => form.norm = e.target.checked}></input>
                              <label class="form-check-label" for="flexSwitchCheckChecked">Convert from r to z?</label>
                            </div><br/>
                            <CFormLabel class="form-label">Name your matrix</CFormLabel>
                            <CFormInput type="text" class="form-control" name="matrixName" onChange={onFormChange}/>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
                <div class="p-2 bg-light border">
                     <div class="d-grid gap-2"><br></br>
                        <button type="submit" class="btn btn-primary" variant="outline" disabled={disabled_value} hidden={uniqueName}>
                          {visible && <span class="spinner-border spinner-border-sm" role="status" id="load_preprocess"></span>}
                            Generate Connectivity Matrix
                        </button>
                     </div>
                     <div class="form-check">
                        <label class="form-check-label" for="flexCheckDefault">Save parameters</label>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled></input>
                     </div>
                   </div>
                </form>
            </CCol>
        </CRow>
    )
}

export default Analysis