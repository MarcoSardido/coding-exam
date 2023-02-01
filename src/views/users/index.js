import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';
import Modal from '../../components/Modal/ModalComp'

function Index() {

  // Hooks
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalObj, setModalObj] = useState({ title: '', btnTitle: '', btnColor: '' });
  const [userData, setUserData] = useState({ userFName: '', userLName: '', userEmail: '' })

  // APIs
  const getUsers = async () => {
    try {
      const res = await fetch('https://reqres.in/api/users?page=1')
      const data = await res.json();
      setUserList(data.data)
    } catch (error) {
      console.error(`Error at getting all users: ${error}`)
    }
  }

  const getUser = async (id) => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`)
      const data = await res.json();
      const user = data.data;

      let updatedUserData = {
        userID: user.id,
        userAvatar: user.avatar,
        userFName: user.first_name,
        userLName: user.last_name,
        userEmail: user.email
      }

      setUserData(userData => ({
        ...userData,
        ...updatedUserData
      }))
    } catch (error) {
      console.error(`Error at getting single user: ${error}`)
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  // Functions
  const handleButtonClick = (type) => {
    const title = type === 'add' ? 'Add User' : type === 'update' ? 'Edit User' : 'Delete User'
    const btnTitle = type === 'add' ? 'Create' : type === 'update' ? 'Update' : 'Delete'
    const btnColor = type === 'add' || type === 'update' ? 'primary' : 'danger'

    let updatedModalObj = {
      title: title,
      btnTitle: btnTitle,
      btnColor: btnColor
    }

    setShowModal(true)
    setModalObj(modalObj => ({
      ...modalObj,
      ...updatedModalObj
    }))
  }

  const hadndleUpdateUser = (id) => {
    getUser(id)
  }

  return (
    <Container>
      <div className="mt-3 text-right">
        <Button onClick={() => handleButtonClick('add')} color="primary">+ Add User</Button>
      </div>

      {showModal && <Modal openProp={showModal} toggleProp={setShowModal} modalObjProp={modalObj} userDataProp={userData} />}

      <Table className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {userList.length > 0 ? userList.map(user => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td><img src={user.avatar} alt={user.first_name} /></td>
                <td>{user.email} </td>
                <td>{user.first_name} </td>
                <td>{user.last_name} </td>
                <td>
                  <Button onClick={() => {
                    handleButtonClick('update')
                    hadndleUpdateUser(user.id)
                  }} color='warning'>update</Button>
                  <Button onClick={() => {
                    handleButtonClick('delete')
                    hadndleUpdateUser(user.id)
                  }} color='danger'>delete</Button>
                </td>
              </tr>
            )
          }) : null}
        </tbody>
      </Table>
    </Container>
  );
}

export default Index;
