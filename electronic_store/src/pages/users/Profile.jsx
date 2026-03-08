import { Col, Container, Row } from "react-bootstrap"
import UserProfileView from "../../components/users/UserProfileView"

const Profile = () => {
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
              <UserProfileView user = {
                {
                name: "Vansh Jangra",
                email: "vanshjangra@gmail.com",
                gender: "Male",
                about: "I am admin user",
                roles: [{roleName: "Admin"}, {roleName: "Normal"}]
                }
              }/>
             </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Profile