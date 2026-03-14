import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user.service"
import { Card, Col, Container, Row } from "react-bootstrap"
import SingleUserView from "../../components/SingleUserView"

const AdminUsers = () => {
  const [userData, setUserData] = useState(undefined)

  useEffect(() => {
    getUsers(0, 10, 'name', 'asc')
  }, [])

  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
    .then((data) => {
      console.log(data)

      setUserData({
        ...data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h3>User List</h3>

              {
                userData.content.map(user => (
                  <SingleUserView user={user}/>
                ))
              }
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
     {
      userData && userView()
     }
    </>
  )
}

export default AdminUsers
