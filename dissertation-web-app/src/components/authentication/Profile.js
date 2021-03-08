import React, { useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from './CenteredContainer'
import { database } from '../../firebase'

const Profile = () => {
const [error, setError] = useState("")
const { currentUser, logout } = useAuth()
const history = useHistory()
const [username,setName]=useState("")
//const allImages = {imgUrl: ''}
    //const [imageAsFile, setImageAsFile] = useState('')
    //const [imageAsUrl, setImageAsUrl] = useState(allImages)

    //const handleImageAsFile = (e) => {
        //const image = e.target.files[0]
        //setImageAsFile(imageAsFile => (image))
    //}

    /*const handlePicUpload = (e) => {
        e.preventDefault()

        if(imageAsFile === '') {
            setError("Not a valid image")
        }
        
        const uploadTask = database.profilePic.put(imageAsFile)

        uploadTask.on('state_changed', 
            (snapShot) => {
            //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
            //catches the errors
                setError(err)
            }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            database.profilePic.child(imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            })
        })

    }*/
    
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.pushState("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    // <div>
    //                     <strong>Profile Picture: </strong>
    //                     <img src={imageAsUrl.imgUrl} alt="" />
    //                     <form>
    //                         <input type="file" onChange={handleImageAsFile}/>
    //                         <Button style={{padding:"0 6px 0 6px", borderColor:"#FF6B09", backgroundColor:"#FF6B09"}}>Update Profile Picture</Button>
    //                     </form>
    //                 </div>
    
    return (
        <div style={{backgroundColor:"#F6D7AF"}}>
        <CenteredContainer>
            <div className="w-100 text-left mt-2">
                <Link style={{fontWeight:"bold", color:"#FF6B09"}} to="/">&lt; Groups</Link>
            </div>
            <div style={{padding:"5px"}}></div>
            <Card style={{backgroundColor:"#F6D7AF"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <hr></hr>
                    <div>
                        <strong>First Name: </strong>
                        {username && username.map(username=>{
                            return(
                                username.username
                            )}
                            )}
                    </div>
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3" style={{backgroundColor: "#FF6B09", borderColor: "#FF6B09"}}>
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Not you?<Button variant="link" onClick={handleLogout} style={{color: "#FF6B09"}}>Log Out</Button>
            </div>
        </CenteredContainer>
        </div>
    )
}

export default Profile
