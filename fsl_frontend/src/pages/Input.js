import React, { useEffect, useState, useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { CTabContent, CTabPane, CNav, CNavLink, CNavItem, CLink, CFormCheck, CFormLabel, CCardHeader, CCol, CRow, CAccordion, CAccordionBody, CAccordionHeader, CButton, CCard, CCardBody, CCardGroup, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CAccordionItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cliHamburgerMenu } from '@coreui/icons'

import { cilCloudDownload } from '@coreui/icons' 
import { DocsExample, PPStep } from '../components'

 
function Input(){ 
    const nav =useNavigate();

    /// --- MANDATORY INPUTS --- \\\
    const steps = {bet:true, mcf:false, sli:false, spat:true};

    const [form, setForm] = React.useState({bet:null, mcf:null, sli:null, spat:null});

    const [file, setFile] = useState()
    const onFileChange = (e) => { setFile(e.target.files[0])}

    const [processName, setProcessName] = useState()
    const onProcessNameChange = (e) => {setProcessName(e.target.value)}

    /// --- OPTIONAL INPUTS --- \\\
    const onParamsChange = (e) => {
        setForm({ ...form,[e.target.name]: e.target.value,});
    };

    function extractParams(allParams){
        let extracted = {}
        for (let step of Object.keys(steps)){
            if (steps[step] == true){
                let typeParams = {}
                for (let p of allParams.target.elements) {
                    if (p.name.substring(0, 3) == step && p.value !== "" && p.name != step){
                        Object.assign(typeParams, {[p.name.substring(4, p.name.length)]:p.value})}
                }
                typeParams = setParams(typeParams, step)
                Object.assign(extracted, {[step]:typeParams})
            }
        }
        return extracted
    }

    function setParams(extractedParams, type){
        if (type == "bet"){
            return setBetParams(extractedParams)
        }else if (type == "mcf"){
            return setMcfParams(extractedParams)
        }else if (type == "sli"){
            return setSliParams(extractedParams)
        }
    }

    //  --  Bet params  -- \\
    const [t2File, setT2File] = useState()
    const onT2FileChange = (e) => { setT2File(e.target.files[0])}

    const [hiddenT2, setHiddenT2] = useState(true);
    const [hiddenCentreVoxel, setHiddenCentreVoxel] = useState(true)

    function setBetParams(betParams){
        // default params
        if (Object.getOwnPropertyNames(betParams).length == 0) {
            betParams["vars"] = "default";
            betParams["frac"] = 0.5;
            betParams["vertical"] = 0;
        }else {
            if (!"vars" in betParams) {betParams["vars"] = "default"}
            if (!"frac" in betParams) {betParams["frac"] = 0.5}
            if (!"vertical" in betParams) {betParams["vertical"] = 0}
            if ("centre" in betParams){
                let centre = [parseFloat(betParams["centreX"]),parseFloat(betParams["centreY"]),parseFloat(betParams["centreZ"])];
                delete betParams["centreX"]; delete betParams["centreY"]; delete betParams["centreZ"];
                betParams["centre"] = centre;
            }else{
                delete betParams["centreX"]; delete betParams["centreY"]; delete betParams["centreZ"]; }
        }
        return betParams
    }

    //  --  McFlirt params  -- \\
    function setMcfParams(){
        const mcfParams = null
        return mcfParams
    }

    //  --  Else params  -- \\
    const [orderFile, setOrderFile] = useState()
    const onOrderFileChange = (e) => { setOrderFile(e.target.files[0])}

    const [timingFile, setTimingFile] = useState()
    const onTimingFileChange = (e) => { setTimingFile(e.target.files[0])}

    const [hiddenSliOrder, hideSliOrder] = useState(true);
    const [hiddenSilTiming, hideSliTiming] = useState(true);
    const [hiddenSliGlobal, hideSliGlobal] = useState(true);
    const [hiddenSliTR, hideSliTR] = useState(true);

    const onSliOrderChange = (e) =>{
        onParamsChange(e);
        (e.target.value == "tcustom") ? hideSliTiming(false):hideSliTiming(true);
        (e.target.value == "ocustom")? hideSliOrder(false):hideSliOrder(true);
    }

    function setSliParams(sliParams){
        if (Object.getOwnPropertyNames(sliParams).length == 0) {

        }else{
            if (!"dir" in sliParams) {sliParams["dir"] = 1}
            if (sliParams["sli_acq"] == "tcustom") {
                sliParams["tcustom"] = timingFile
            }
            if (sliParams["sli_acq"] == "ocustom") {
                sliParams["ocustom"] = orderFile
            }
        }
        return sliParams
    }

    /// --- LAYOUT --- \\\
    const [activeKey, setActiveKey] = useState(1)
    const [visible, setVisible] = useState(false);
    const [disabled_value, setDisabled] = useState(false);
    //const form = document.getElementById("form-preprocess");

    /// --- Starts preprocessing, call API --- \\\
    const startPreprocessing = (e) => {
        e.preventDefault();
        alert("Your data is being preprocessed. This may take a while...")
        const params = extractParams(e);

        setVisible(true);
        setDisabled(true);
        setFile(e.target.value)
        //let betParams = setBetParams()

        const formData = new FormData();
        formData.append("file", file);
        formData.append("processName", processName);
        formData.append("bet", JSON.stringify(params["bet"]));
        formData.append("mcf", JSON.stringify(params["mcf"]));
        formData.append("sli", JSON.stringify(params["sli"]));

        fetch('http://localhost:5000/preprocess', {
            method: 'POST',
            body: formData})
        .then((res) => res.json())
        .then((data) => {
            //setForm(initialForm);
            setVisible(false);
            setDisabled(false);

            setFile(null);
            setT2File(null);
            setProcessName("");
            //window.location.reload(false);
            })
        .catch((err) => console.log(err))
    }


    /////////////////////////// TODO remove or work on!!!
    //const [output_brain_name, setOutputBrainName] = useState()
    //const onOutputBrainNameChange = (e) => {setProcessName(e.target.value)}

    //STILL IN IMPLEMENTATION
    const [items, setItems] = useState([`<p><CIcon icon={cilReload} size="lg" /> Apple</p>`, 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry']);
    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };
    //STILL IN IMPLEMENTATION

    const downloadEmployeeData = () => {
        fetch('http://localhost:5000/download')
            .then(res => {
                res.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'employees.json';
                    a.click();
                });
                //window.location.href = response.url;
        });
    }
    //-----------------end test---------------------
     const drop = (e) => {
        const copyListItems = [...items];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setItems(copyListItems);
      };
      // This part crshes the app!!!

     function addFile(selected_file,process_name){
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
                                </tr>
                             </tbody>`;
        table.tBodies[0].appendChild(newFile);
    }
/////////////////////////// TODO remove or work on!!!
 
return (

    <CRow>
        <CCol xs={12}>
            <div class="d-grid gap-4">
            <h1> Preprocessing </h1>
            </div>
            <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                  <form onSubmit={startPreprocessing}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <div>
                                <CFormLabel htmlFor="formFile">Choose your MRI input file </CFormLabel>
                                <CInputGroup>
                                    <CFormInput onChange={onFileChange} type="file" id="input_file" name="file" required/>
                                    <div class="invalid-feedback">Please select a file.</div>
                                </CInputGroup>
                            </div><br/>
                            <CFormLabel class="form-label">Name this process</CFormLabel>
                            <CFormInput onChange={onProcessNameChange} type="text" class="form-control" id="process_name"  value={processName} required />
                            <div class="invalid-feedback">Please choose a name for this preprocess</div>
                        </CCardHeader>
                        <div class="container" id="div_brain_extract">
                            <CCardBody>
                                <CAccordion accordion-border-color="text-warning" alwaysOpen>
                                    <CAccordionItem itemKey={1}>
                                    {/*<div>
                                {items&&
                                    items.map((item, index) => (
                                      <div style={{ margin:'20px 25%'}} key={index} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} draggable>
                                          {item}
                                      </div>
                                      ))}
                                </div>*/}
                                        <CAccordionHeader>
                                            <div class="col-1">
                                              <div class="avatar rounded bg-primary text-white">1</div>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-check form-switch form-switch-xl">
                                                   <input class="form-check-input" type="checkbox" id="id_bet" name="bet" value={steps.bet} onChange={e => steps.bet = (e.target.checked)}/>
                                                   <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Brain erosion</b><i> - Brain Extraction Tool (BET)</i></label>
                                                </div>
                                            </div>
                                            </CAccordionHeader>
                                            <CAccordionBody>
                                            <div>
                                                Fractional intensity treshhold;<i>&nbsp;Smaller values give larger brain outline estimates. </i>
                                                <CInputGroup>
                                                     <CFormLabel className="col-sm-2 col-form-label"><b>Fraction:</b></CFormLabel>
                                                        <CCol sm={2}>
                                                            <CFormInput type="number" setp="any" defaultValue="0.5" name="bet_frac" value={form.bet_frac} onChange={onParamsChange}/>
                                                        </CCol>
                                               </CInputGroup>
                                               </div><br/>
                                               <div>
                                               Treshhold gradient; <i>&nbsp;Positive values give larger brain outline at bottom, smaller at top</i>
                                               <CInputGroup>
                                                <CFormLabel className="col-sm-2 col-form-label"><b>Threshold gradient:</b></CFormLabel>
                                                    <CCol sm={2}>
                                                        <CFormInput type="number" defaultValue="0" name="bet_vertical" value={form.bet_vertical} onChange={onParamsChange}/>
                                                    </CCol>
                                                 </CInputGroup>
                                                 </div>
                                                 <br></br>
                                               <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked="true" name="bet_no" value={form.bet_no} onChange={e => form.bet_no = (e.target.checked)}></input>
                                                  <label class="form-check-label" for="flexSwitchCheckChecked">Output brain-extracted image</label>
                                                </div>
                                                <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="bet_skull" value={form.bet_skull} onChange={e => {form.bet_skull = (e.target.checked);}}></input>
                                                  <label class="form-check-label" for="flexSwitchCheckDefault">Output exterior skull surface image</label>
                                                </div>
                                                <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="bet_outline" value={form.bet_outline} onChange={e => {form.bet_outline = (e.target.checked);}}></input>
                                                  <label class="form-check-label" for="flexSwitchCheckDefault">Output brain surface overlaid onto original image</label>
                                                </div>
                                                <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" id="bet_mask_check" name="bet_mask" value={form.bet_mask} onChange={e => {form.bet_mask = (e.target.checked);}} ></input>
                                                  <label class="form-check-label" for="flexSwitchCheckDefault">Output binary brain mask image</label>
                                                </div>
                                                <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" id="bet_mask_check" name="bet_thresh" value={form.bet_thresh} onChange={e => {form.bet_thresh = (e.target.checked);}} ></input>
                                                  <label class="form-check-label" for="flexSwitchCheckDefault">Apply thresholding to brain and mask image</label>
                                                </div>
                                                <div class="form-check form-switch">
                                                  <input class="form-check-input" type="checkbox" role="switch" name="bet_centre" value={form.bet_centre} onChange={e => {form.bet_centre = (e.target.checked); (e.target.checked) ? setHiddenCentreVoxel(false):setHiddenCentreVoxel(true)}}></input>
                                                  <label class="form-check-label" for="flexSwitchCheckDefault">Center of gravity in voxels</label>
                                                </div>
                                                <div class="row g-3" hidden={hiddenCentreVoxel} >
                                                  <CFormLabel><b>Coordinate (voxels) for centre of initial brain surface sphere:</b></CFormLabel>
                                                  <div class="col-sm-2">
                                                    <div class="input-group">
                                                        <span class="input-group-text"> Sphere = </span>
                                                        <input type="number" class="form-control" step="any" min="0" max="1000" defaultValue="0.0" name="bet_centreZ" value={form.bet_centreZ} onChange={onParamsChange}/>
                                                    </div>
                                                  </div>
                                                  <div class="col-sm-2">
                                                    <div class="input-group">
                                                        <span class="input-group-text"> Y = </span>
                                                        <input type="number" class="form-control" step="any" min="0" max="1000" defaultValue="0.0" name="bet_centreY" value={form.bet_centreY} onChange={onParamsChange}/>
                                                    </div>
                                                  </div>
                                                  <div class="col-sm-2">
                                                    <div class="input-group">
                                                        <span class="input-group-text"> X = </span>
                                                        <input type="number" class="form-control" step="any" min="0" max="1000" defaultValue="0.0" name="bet_centreX" value={form.bet_centreX} onChange={onParamsChange}/>
                                                    </div>
                                                  </div>
                                                </div><br/>
                                                <CFormLabel class="form-label"><b>Please select the method you want to use:</b></CFormLabel>
                                                <select class="form-select form-select-md mb-3" aria-label=".form-select-lg example" defaultValue="default" name="bet_vars" value={form.bet_vars} onChange={e => {onParamsChange(e); (e.target.value == "t2_guided")? setHiddenT2(false):setHiddenT2(true)}}>
                                                  <option value="default" selected>Run standard brain extraction using bet2</option>
                                                  <option value="robust">Robust brain centre estimation (iterates bet2 several times)</option>
                                                  <option value="remove_eyes">Eye & optic nerve cleanup (can be useful in SIENA)</option>
                                                  <option value="reduce_bias">Bias field & neck cleanup (can be useful in SIENA)</option>
                                                  <option value="padding">Improve BET if FOV is very small in Z</option>
                                                  <option value="surfaces">Run bet2 and then betsurf to get additional skull and scalp surfaces</option>
                                                  <option value="t2_guided" >Standard brain extraction using bet2, when also feeding in non-brain extracted T2</option>
                                                </select>
                                                <div hidden={hiddenT2} required={!hiddenT2} >
                                                    <CFormLabel htmlFor="formFile"><strong>Choose your brain T2 image </strong></CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput onChange={onFileChange} type="file" name="t2File" onChange={onT2FileChange} />
                                                        <div class="invalid-feedback">Please select a file.</div>
                                                    </CInputGroup>
                                                </div>
                                            </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={2}>
                                        <CAccordionHeader>
                                            <div class="col-1">
                                                <div class="avatar rounded bg-primary text-white">2</div>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-check form-switch form-switch-xl">
                                                   <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultXl" id="id_mcf" name="mcf" value={steps.mcf} onChange={e => steps.mcf = (e.target.checked)}/>
                                                   <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Motion correction</b></label>
                                                </div>
                                            </div>
                                        </CAccordionHeader>
                                            <CAccordionBody>
                                                 all Prams?
                                            </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={3}>
                                        <CAccordionHeader>
                                            <div class="col-1">
                                                <div class="avatar rounded bg-primary text-white">3</div>
                                            </div>
                                            <div class="col-8">
                                                <div class="form-check form-switch form-switch-xl">
                                                   <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultXl" id="id_sli" name="sli" value={steps.sli} onChange={e => steps.sli = (e.target.checked)}/>
                                                   <label class="form-check-label" for="flexSwitchCheckDefaultXl"><b>Slice time correction </b> - <i> with FEAT</i></label>
                                                </div>
                                            </div>
                                        </CAccordionHeader>
                                            <CAccordionBody>
                                                <CFormLabel class="form-label"><b>In what order were the slice acquired?</b></CFormLabel>
                                                    <select class="form-select form-select-md mb-3" aria-label=".form-select-lg example"  name="sli_acq" value={form.sli_acq} onChange={onSliOrderChange} required>
                                                      <option value="default">From bottom to top</option>
                                                      <option value="down">From top to bottom</option>
                                                      <option value="interleaved">Interleaved acquisition</option>
                                                      <option value="tcustom">Define acquisition order with personal file</option>
                                                      <option value="ocustom">Define acquisition timings with personal file</option>
                                                    </select>
                                                <div hidden={hiddenSliOrder} required={hiddenSliOrder}>
                                                    <CFormLabel htmlFor="formFile"><strong>Choose your slice time order file</strong></CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput type="file" name="orderFile" onChange={onOrderFileChange} />
                                                        <div class="invalid-feedback">Please select a file.</div><br/>
                                                    </CInputGroup><br/>
                                                </div>
                                                <div hidden={hiddenSilTiming} required={hiddenSilTiming}>
                                                    <CFormLabel htmlFor="formFile"><strong>Choose your slice time order file</strong></CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput type="file" name="timingFile" onChange={onTimingFileChange} />
                                                        <div class="invalid-feedback">Please select a file.</div>
                                                    </CInputGroup><br/>
                                                </div>
                                                <div>
                                                    <CFormLabel ><b>Choose slice direction</b></CFormLabel>
                                                    <CInputGroup value={form.sli_order} onChange={onParamsChange} >
                                                        <CFormCheck inline type="radio" name="inlineRadioOptions" value="1" label="X"/>
                                                        <CFormCheck inline type="radio" name="inlineRadioOptions" value="2" label="Y" defaultChecked/>
                                                        <CFormCheck inline type="radio" name="inlineRadioOptions" value="3" label="Z"/>
                                                    </CInputGroup>
                                                </div><br/>
                                                <div>
                                                    <div class="form-check form-switch">
                                                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" name="sli_global" value={form.sli_global} onChange={e => {form.sli_global = (e.target.checked); (e.target.checked)? hideSliGlobal(false):hideSliGlobal(true)}}></input>
                                                      <label class="form-check-label" for="flexSwitchCheckChecked">Global shift:</label>
                                                    </div>
                                                    <CInputGroup hidden={hiddenSliGlobal}>
                                                        <CCol sm={2}>
                                                            <CFormInput type="number" setp="any" defaultValue="0.5" name="sli_global" value={form.sli_global} onChange={onParamsChange}/>
                                                        </CCol>
                                                    </CInputGroup>
                                                </div><br/>
                                                <div>
                                                    <div class="form-check form-switch">
                                                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" name="sli_tr" value={form.sli_tr} onChange={e => {form.sli_tr = (e.target.checked); (e.target.checked)? hideSliTR(false):hideSliTR(true)}}></input>
                                                      <label class="form-check-label" for="flexSwitchCheckChecked">Specify the TR of the data</label>
                                                    </div>
                                                    <CInputGroup hidden={hiddenSliTR}>
                                                        <CCol sm={2}>
                                                            <CFormInput type="number" setp="any" name="sli_tr" value={form.sli_tr} onChange={onParamsChange}/>
                                                        </CCol>
                                                    </CInputGroup>
                                                </div>
                                            </CAccordionBody>
                                    </CAccordionItem>
                                </CAccordion>
                                <br/>
                                <div class="p-2 bg-light border">
                                     <div class="d-grid gap-2"><br></br>
                                        <button type="submit" class="btn btn-primary" variant="outline" disabled={disabled_value}>
                                          {visible && <span class="spinner-border spinner-border-sm" role="status" id="load_preprocess"></span>}
                                            Start Preprocessing
                                        </button>
                                     </div>
                                     <div class="form-check">
                                        <label class="form-check-label" for="flexCheckDefault">Save parameters</label>
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled></input>
                                     </div>
                                </div>
                            </CCardBody>
                        </div>
                    </CCard>
                  </form>
                </CTabPane>
            </CTabContent>
        </CCol>
    </CRow>
) 
} 
 
export default Input 
