import { CButton, CCloseButton, CCol, CRow, CContainer, CForm, CFormInput} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'


function FileSelector(props){

        const [file, setFile] = useState()
        const [filename, setFilename] = useState(" ")

        const onFileChange = (e) => {
            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)
        }

        return(
              <CContainer>
                <CRow className="align-items-start">
                  <CCol class="col-1"><CButton color="secondary" disabled>{props.number}</CButton></CCol>
                  <CCol class="col-10"><CFormInput  type="file" id="input_file" name="file" filename="" onChange={onFileChange} /></CCol>
                  <CCol class="col-1"><CCloseButton /></CCol>
                </CRow>
              </CContainer>
        );
    }

export default FileSelector;