import { useContext } from "react"
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {isLoggedIn} from "../../auth/HelperAuth";

const Dashboard = () => {
    const userContext = useContext(UserContext);

    // const redirect = useNavigate()

    const dashboardView = () => {
        return (
        <div>
            {/* <h1>This is user dashboard</h1> */}
            <Outlet/>
        </div>
        )
    }

    const notLoggedInView = () => {
        return (
            <Container>
                <Row>
                    <Col md={{
                        span: 8,
                        offset: 2
                    }}>
                    <Card className="border-0 shadow mt-3">
                        <Card.Body className="text-center">
                            <h3>You are not logged in!</h3>
                            <p>Please do login to view the page</p>
                            <Button as={NavLink} to="/login" variant="success">Login Now</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        (isLoggedIn()) ? dashboardView() : <Navigate to="/login"/>
    )
}

export default Dashboard