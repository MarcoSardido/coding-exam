import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, FormGroup, Label, Input, Spinner } from 'reactstrap';

const ModalComp = ({ openProp, toggleProp, modalObjProp, userDataProp }) => {

    // Hooks
    const [isLoading, setIsLoading] = useState(false)

    // API
    const createUser = async () => {
        setIsLoading(prev => !prev)
        try {
            const res = await fetch('https://reqres.in/api/users', { method: 'POST' })
            return res;
        } catch (error) {
            console.error(`Error creating a user: ${error}`)
        }
    }

    const updateUser = async (id) => {
        setIsLoading(prev => !prev)
        try {
            const res = await fetch(`https://reqres.in/api/users/${id}`, { method: 'PUT' })
            return res;
        } catch (error) {
            console.error(`Error updating a user: ${error}`)
        }
    }

    const deleteUser = async (id) => {
        setIsLoading(prev => !prev)
        try {
            const res = await fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE' })
            return res;
        } catch (error) {
            console.error(`Error deleting a user: ${error}`)
        }
    }


    // Functions
    const toggle = () => toggleProp(!openProp);

    const handleAction = (id, type) => {
        const actionType = type.split(' ')[0]

        if (actionType === 'Add') {
            createUser(id).then(res => {
                setIsLoading(prev => !prev)
                toggle()
                if (res.ok) {
                    alert('New user has been created')
                }
            });

        } else if (actionType === 'Edit') {
            updateUser(id).then(res => {
                setIsLoading(prev => !prev)
                toggle()
                if (res.ok) {
                    alert('User has been updated')
                }
            });
        } else {
            deleteUser(id).then(res => {
                setIsLoading(prev => !prev)
                toggle()
                if (res.ok) {
                    alert('User has been deleted')
                }
            });
        }
    }

    return (
        <div>
            <Modal centered isOpen={openProp} toggle={toggle} style={{ opacity: isLoading ? 0.7 : 1 }}>
                {isLoading && <Spinner style={{
                    position: 'absolute',
                    left: '200px',
                    top: '150px'
                }}>Loading...</Spinner>}

                <ModalHeader toggle={toggle}>{modalObjProp.title}</ModalHeader>
                <ModalBody>
                    <Form style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {modalObjProp.title === 'Delete User' && (
                            <>
                                <img
                                    style={{
                                        width: '30%',
                                        alignSelf: 'center',
                                        marginBottom: '20px'
                                    }}
                                    src={userDataProp.userAvatar} alt={userDataProp.userFName} srcset="" />

                                <FormGroup>
                                    <Label for="exampleID">
                                        User ID
                                    </Label>
                                    <Input
                                        id="exampleID"
                                        name="email"
                                        value={userDataProp.userID}
                                        disabled
                                    />
                                </FormGroup>
                            </>
                        )}
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleFirstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="exampleFirstName"
                                        name="firstName"
                                        type="text"
                                        value={userDataProp.userFName || ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleLastName">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="exampleLastName"
                                        name="lastName"
                                        type="text"
                                        value={userDataProp.userLName || ''}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                value={userDataProp.userEmail || ''}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={modalObjProp.btnColor} onClick={() => handleAction(userDataProp.userID, modalObjProp.title)}>
                        {modalObjProp.btnTitle}
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}

export default ModalComp