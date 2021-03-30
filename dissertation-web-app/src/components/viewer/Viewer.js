import React from 'react'
import { useGroup } from "../../hooks/useGroup"
import { useParams, useLocation } from "react-router-dom"

const Viewer = ({group}) => {

    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { childFiles } = useGroup(groupId, state.group)

    return (
        <div style={{height:"100%", backgroundColor: "black"}}>
            {/*src="https://firebasestorage.googleapis.com/v0/b/dissertation-webapp-dev-d348c.appspot.com/o/files%2FbKZ3h1hsEuXWEjaMQCHWn1jqMJ73%2Fbaryon%2F20210210_124157.jpg?alt=media&token=5de81985-0773-4ef9-ae3d-68e252d0c441"            {childFiles.map(childFile => (
            */}
            {childFiles.map(childFile => (
                <div>
                    <img src={childFile.url}
                    alt="example"
                    width="100%" />
                </div>
            ))}
        </div>
    )
}

export default Viewer