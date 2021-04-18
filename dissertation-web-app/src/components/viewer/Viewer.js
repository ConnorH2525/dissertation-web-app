import React from 'react'
import { useGroup } from "../../hooks/useGroup"
import { useParams, useLocation } from "react-router-dom"
import CenteredContainer from '../authentication/CenteredContainer'

const Viewer = () => {

    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { childFiles } = useGroup(groupId, state.group)

    //height: "100%", 

    return (
            <div style={{position: "relative", backgroundColor: "black"}}>
                {childFiles.length > 0 && (
                    <div>
                    {childFiles.map(childFile => (
                        <div 
                            key={childFile.id}
                        >
                            {!childFile.isText && 
                                <div style={{backgroundColor: "black"}}>
                                    <img
                                    src={childFile.url}
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
                            <h1 style={{color: "white", margin: "0", bottom: "0", right: "0", padding: "1vh 30px", backgroundColor: "#0099FF", position: "absolute"}}>{childFile.username}</h1>
                        </div>
                    ))}
                    </div>
                )}

            </div>
            
    )
}

export default Viewer