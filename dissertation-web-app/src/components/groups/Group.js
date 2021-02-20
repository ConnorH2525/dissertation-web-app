import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

const Group = ({ group }) => {
    return (
        <Button to={{
            pathname: `/group/${group.id}`,
            state: { group: group }
        }}
            variant="outline-dark"  className="text-truncate w-100" as={Link}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            {group.name}
    </Button>
    )
}

export default Group

