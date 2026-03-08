import { Alert, Col, Container, Row, Modal, Button, Card, Table, Form } from "react-bootstrap"
import UserProfileView from "../../components/users/UserProfileView"
import { useContext, useEffect, useState } from "react"
import UserContext from '../../context/UserContext'
import { toast } from "react-toastify"
import { getUser } from "../../services/user.service"
import { useParams } from "react-router-dom"

const Profile = () => {
    const userContext = useContext(UserContext)
    const {userId} = useParams()
    const [user, setUser] = useState(null)

    const [show, setShow] = useState(false);

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
                    <Table className="text-center" responsive hover>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                              <Form.Control className="text-center" type="text" value={user.name}/>  
                            </td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>

                        <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                        </tr>

                        <tr>
                            <td>About</td>
                            <td>
                                <Form.Control as={'textarea'} value={user.about} rows={8}/>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
                    span: 8,
                    offset: 2
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