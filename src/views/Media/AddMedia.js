import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth/Login';

import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout,
    CForm,
    CFormGroup,
    CLabel,
    CInput

} from '@coreui/react'
import classes from './media.module.css';
export default function AddMedia(props) {

    const [loadedFiles, setLoadedFiles] = useState([])

    const { dispatch } = useContext(AuthContext);
    useEffect(() => {
        dispatch({ type: 'check', payload: props })
    }, [])

    const handleFile = (e) => {
        const files = e.target.files;
        console.log(files);
        const newLoadedFiles = [...loadedFiles]
        for (let i = 0; i < files.length; i++) {
            newLoadedFiles.push({
                file: files[i],
                preview: URL.createObjectURL(files[i]),
                loaded: 0
            })
        }
        setLoadedFiles(newLoadedFiles)
    }
    const removeItem = (selectedFile) => {
        const filteredFile=loadedFiles.filter(file => file !== selectedFile)
        setLoadedFiles(filteredFile)
    }
    return (
        <CRow>
            <CCol xs="12">
                <CCard>
                    <CCardHeader>
                        <h6>Add Media</h6>
                    </CCardHeader>
                    <CCardBody>
                        <div className={classes.addMediaSection}>
                            <div className={classes.filePreview}>
                                {
                                    loadedFiles.map((file, index) => {                                        
                                        return (
                                            <div className={classes.file} key={index}>
                                                {
                                                    file.loaded === 0 ?
                                                        <span className={classes.removeIcons} onClick={() => {removeItem(file)}} >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="c-icon c-icon-2xl" role="img"><polygon fill="var(--ci-primary-color, currentColor)" points="348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302" className="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z" className="ci-primary"></path></svg>
                                                        </span>
                                                        : null
                                                }
                                                <img src={file.preview} alt={file.preview} />
                                                <CProgress striped color="success" value={file.loaded} className="mb-3" />

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.dragdropSection}>
                                <h3>Drag your document</h3>
                                <span>Or</span>
                                <CForm className="form-horizontal">
                                    <CFormGroup row>
                                        <CLabel htmlFor="file-multiple-input" >
                                            <div className={classes.fileSelection}> Select Document</div>
                                        </CLabel>
                                        <CInput type="file" id="file-multiple-input" name="file-multiple-input"
                                            multiple
                                            onChange={handleFile}
                                        />
                                    </CFormGroup>
                                </CForm>
                            </div>
                        </div>
                    </CCardBody>
                    <CCardFooter>
                        <button type="submit" size="sm" color="primary">
                            <strong>Upload</strong>
                        </button>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}
