import React from 'react'
import { Container } from 'react-bootstrap'
import AddGroupButton from './AddGroupButton'
import AddMediaButton from "./AddMediaButton"
import { useGroup } from "../../hooks/useGroup"
import Group from "./Group"
import File from "./File"
import GroupBreadCrumbs from "./GroupBreadCrumbs"
import { useParams, useLocation } from "react-router-dom"
import { ROOT_GROUP } from '../../hooks/useGroup'

const Dashboard = () => {
    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { group, groups, childFiles } = useGroup(groupId, state.group)

    return <>
        <Container fluid>
            <div className="d-flex align-items-center">
                <GroupBreadCrumbs currentGroup={group} />
                <div>
                    {!(group === ROOT_GROUP) &&
                    <AddMediaButton currentGroup={group} />
                    }
                </div>
                <div>
                    {(group === ROOT_GROUP) &&
                    <AddGroupButton currentGroup={group} />
                    }
                </div>
                
            </div>
            {groups.length > 0 && (
                <div className="d-flex flex-wrap">
                    {groups.map(childGroup => (
                        <div 
                            key={group.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                            <Group group={childGroup} />
                        </div>
                    ))}
                </div>
            )}
            {groups.length > 0 && childFiles.length > 0 && <hr />}
            {childFiles.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFiles.map(childFile => (
                        <div 
                            key={childFile.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                            <File file={childFile} />
                        </div>
                    ))}
                </div>
            )}
        </Container>
    </>
}

export default Dashboard
