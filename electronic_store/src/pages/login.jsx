import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Base from "../components/Base"
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom"

const Login = () => {
  const loginForm = () => {
    return (
      <Container>
        <Row>
          <Col md={{span: 8, offset: 2}}>
          <Card className="my-3 border-0 shadow"style={{
            position: "relative",
            top: -60
          }}>
            <Card.Body>
              <Container className="text-center mb-3">
                <img src={logo} alt="Store logo" width={80} height={80}/>
              </Container>

              <h3 className="text-center text-uppercase">Store Login</h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter here"/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter here"/>
                </Form.Group>
              </Form>

              <Container className="text-center">
                {/* <p>Forget Password! <a href="/forget">Click here</a></p> */}
                <p>If not registered! <NavLink to="/register">Click here</NavLink></p>
              </Container>

              <Container className="text-center">
                <Button className="" variant="success">Login</Button>
                <Button className="ms-2" variant="danger">Reset</Button>
              </Container>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Base title="Electro Store / Login Page"
          description={null}>
         {loginForm()}
    </Base>
  )
}

export default Login
