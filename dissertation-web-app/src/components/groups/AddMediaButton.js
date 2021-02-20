import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDOM from "react-dom"
import { useAuth } from '../../contexts/AuthContext'
import { storage, database } from "../../firebase"
import { ROOT_GROUP } from "../../hooks/useGroup"
import { v4 as uuid4 } from  "uuid"
import { Toast, ProgressBar } from "react-bootstrap"

const AddMediaButton = ({ currentGroup }) => {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currentUser } = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0]
        if (currentGroup == null || file == null) return

        const id = uuid4(0)
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false }
        ])
        const filePath = 
            currentGroup === ROOT_GROUP 
            ? `${currentGroup.path.join("/")}/${file.name}`
            : `${currentGroup.path.join("/")}/${currentGroup.name}/${file.name}`

        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }

                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })

            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files
                .where("name", "==", file.name)
                .where("userId", "==", currentUser.uid)
                .where("folderId", "==", currentGroup.id)
                .get()
                .then(existingFiles => {
                    const existingFile = existingFiles.docs[0]
                    if (existingFile) {
                        existingFile.ref.update({ url: url })
                    } else {
                        database.files.add({
                        url: url,
                        name: file.name,
                        createdAt: database.getCurrentTimestamp(),
                        groupId: currentGroup.id,
                        userId: currentUser.uid
                    })
                    }
                })
            })
        })
    }

    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload} />
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
            {uploadingFiles.length > 0 &&
             ReactDOM.createPortal(
                 <div
                 style={{
                     position: "absolute",
                     bottom: "1rem",
                     right: "1rem",
                     maxWidth: "250px"
                 }}>
                     {uploadingFiles.map(file => (
                         <Toast key={file.id} onClose={() => {
                             setUploadingFiles(prevUploadingFiles => {
                                 return prevUploadingFiles.filter(uploadFile => {
                                     return uploadFile.id !== file.id
                                 })
                             })
                         }}>
                             <Toast.Header 
                             closeButton ={file.error}
                             className="text-truncate w-100 d-block"
                             >
                                 {file.name}
                             </Toast.Header>
                             <Toast.Body>
                                 <ProgressBar 
                                    animated={!file.error}
                                    variant={file.error ? "danger" : "primary"}
                                    now={file.error ? 100 : file.progress * 100 }
                                    label={
                                        file.error ? "Error" : `${Math.round(file.progress * 100)}%`
                                    }
                                    />
                             </Toast.Body>
                         </Toast>
                     ))}
                 </div>,
                 document.body
             )}
        </>
    )
}

export default AddMediaButton
