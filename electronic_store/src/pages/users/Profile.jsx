import { Alert, Col, Container, Row, Modal, Button, Card, Table, Form, Spinner } from "react-bootstrap"
import UserProfileView from "../../components/users/UserProfileView"
import { useContext, useEffect, useState } from "react"
import UserContext from '../../context/UserContext'
import { toast } from "react-toastify"
import { getUser, updateUser } from "../../services/user.service"
import { useParams } from "react-router-dom"

const Profile = () => {
    const userContext = useContext(UserContext)
    const {userId} = useParams()
    const [user, setUser] = useState(null)

    const [show, setShow] = useState(false);

    const [updateLoading, setUpdateLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShowModal = () => {
        console.log("Showing modal")
        setShow(true);
    }

    useEffect(() => {
        // console.log("Data from url userid " + userId)

        // if(userContext.userData){
        //     getUserDataFromServer()
        // }

        getUserDataFromServer()
        
    }, [])

    const getUserDataFromServer = () => {
        console.log(userContext)

        getUser(userId)
        .then(data => {
            console.log(data);
            setUser(data)
        })
        .catch(error => {
            console.log(error);
            setUser(null)
            toast.error("Error in loading user information from server!")
        })
    }

    const updateFieldHandler = (event, property) => {
        setUser({
            ...user,
            [property]: event.target.value
        })
    }

    const updateUserData = () => {
        console.log("Updating user data")
        if(user.name === undefined || user.name.trim() === ''){
            toast.error("User name required!")
            return
        }

        setUpdateLoading(true)
        updateUser(user)
        .then(updatedUser => {
            console.log(updatedUser)
            toast.success("User details updated!")
            handleClose()
        })
        .catch(error => {
            console.log(error)

            // if(error.response.status == 400){
            //     toast.error(error.response.data.name)
            // }

            toast.error("Not updated! Error")
        })
        .finally(() => {
            setUpdateLoading(false)
        })
    }

    const updateViewModal = () => {
        return (
            <div>
        <Modal size="lg" animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update the informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Card className="border-0 shadow-sm" style={{
                    borderRadius: "50px"
                }}>
                    <Card.Body>
                    <Table className="" responsive hover>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                              <Form.Control className="" type="text"
                                            value={user.name} onChange={(event) => updateFieldHandler(event, 'name')}/>  
                            </td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>

                        <tr>
                            <td>New Password</td>
                            <td>
                                <Form.Control type="Password" placeholder="Enter new password here"
                                              onChange={(event) => updateFieldHandler(event, 'password')}/>
                                      <p>Leave the field blank for same password</p>        
                            </td>
                        </tr>

                        <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                        </tr>

                        <tr>
                            <td>About</td>
                            <td>
                                <Form.Control as={'textarea'} value={user.about} rows={8}
                                              onChange={(event) => updateFieldHandler(event, 'about')}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Roles</td>
                            <td>{user.roles.map(role => <div key={role.roleId}>{role.roleName}</div>)}</td>
                        </tr>
                    </tbody>
                </Table>
                </Card.Body>
                </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={updateUserData} disabled={updateLoading}>
            <Spinner animation="border" size="sm" hidden={!updateLoading} className="me-2"/>
            <span hidden={!updateLoading}>Updating</span>
            <span hidden={updateLoading}>Save Changes</span>
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )
    }

    return (
        <div>
            <Container className="mt-3">
            <Row>
             <Col md={
                {
                    span: 10,
                    offset: 1
                }
             }>
              
              {(user ? (
                <>
              <UserProfileView user = {
                // {
                // name: "Vansh Jangra",
                // email: "vanshjangra@gmail.com",
                // gender: "Male",
                // about: "I am admin user",
                // roles: [{roleId: 1, roleName: "Admin"}, {roleId: 2, roleName: "Normal"}]
                // }
                user
              }
              handleShowModal = {handleShowModal}
              />  

              {updateViewModal()}

              </>         
              ) : <Alert><h3 className="text-center text-uppercase m-2">User not loaded from server!</h3></Alert>)}

              {/* {userContext.userData.user.userId} */}

             </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Profile