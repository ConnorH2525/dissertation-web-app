import React, { useState } from 'react'
import { useGroup } from "../../hooks/useGroup"
import { useParams, useLocation } from "react-router-dom"
import CenteredContainer from '../authentication/CenteredContainer'
import firebase, { database } from "../../firebase"
import "firebase/firestore"

const Viewer = () => {

    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { childFiles } = useGroup(groupId, state.group)

    return (
            <div style={{height: "100%", backgroundColor: "black"}}>
                {childFiles.length > 0 && (
                    <div>
                    {childFiles.map(async (childFile, index) => (
                        <div 
                            key={childFile.id}
                        >
                            {!childFile.isText && 
                                <div style={{backgroundColor: "black"}}>
                                    <img src={childFile.url}
                                    alt="example"
                                    width="100%"/>
                                </div>
                            }
                            {childFile.isText && 
                                <div style={{backgroundColor: "white"}}>
                                <CenteredContainer>
                                    <h1>{childFile.text}</h1>
                                </CenteredContainer>
                                </div>
                            } 
                            {<h1>{firebase.firestore().collection("users")
                                .doc(childFile.userId)
                                .get(username)}</h1>}
                        </div>
                    ))}
                    </div>
                )}

            </div>
            
    )
}

export default Viewer