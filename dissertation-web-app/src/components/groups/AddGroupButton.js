import React, { useState } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { ROOT_GROUP } from "../../hooks/useGroup"

const AddGroupButton = ({ currentGroup }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { currentUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (currentGroup == null) return

        const path = [...currentGroup.path]
        if (currentGroup !== ROOT_GROUP) {
            path.push({ name: currentGroup.name, id: currentGroup.id })
        }


        database.groups.add({
            name: name,
            parentId: currentGroup.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp()
            // members,
        })

        setName("")
        closeModal()
    }

    return (
        <>
        <Button onClick={openModal} variant="outline-success" size="sm">
            <FontAwesomeIcon icon={faUsers} />
            <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        Create Group
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default AddGroupButton
