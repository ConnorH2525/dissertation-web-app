import React from 'react'
import { useGroup } from "../../hooks/useGroup"
import { useParams, useLocation } from "react-router-dom"
import CenteredContainer from '../authentication/CenteredContainer'

const Viewer = () => {

    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { childFiles } = useGroup(groupId, state.group)

    return (
            <div style={{height: "100%", backgroundColor: "black"}}>
                {childFiles.length > 0 && (
                    <div>
                    {childFiles.map(childFile => (
                        <div 
                            key={childFile.id}
                        >
                            {!childFile.isText && 
                                <img src={childFile.url}
                                alt="example"
                                width="100%"/>
                            }
                            {childFile.isText && 
                                <CenteredContainer>
                                    <h1>{childFile.text}</h1>
                                </CenteredContainer>
                            }
                        </div>
                    ))}
                    </div>
                )}
            </div>
            
    )
}

export default Viewer