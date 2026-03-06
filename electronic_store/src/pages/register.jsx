import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Base from "../components/Base"
import logo from "../assets/logo.png"
import { useState } from "react"

const Register = () => {
  let [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    about:'',
    gender:''
  })

  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null
  })

  const handleChange = (event, property) => {
    // console.log(event)
    // console.log(property)
    setData({
      ...data,
      [property]: event.target.value
    })
  }

  const clearData = () => {
    setData({
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      about:'',
      gender:''
    })
  }

  const registerForm = () => {
    return (
      <Container>
        <Row>

        {/* {JSON.stringify(data)} */}

          <Col sm={{span: 8, offset: 2}}>
          <Card className="my-3 border-0 shadow p-4" style={
            {
            position: 'relative',
            top: -60
            }
          }>
            <Card.Body>
              <Container className="text-center mb-3">
                <img src={logo} alt="Store logo" width={80} height={80}/>
              </Container>

              <h3 className="mb-4 text-center text-uppercase"> Store Signup Here</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Enter your name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" onChange={(event) => handleChange(event, 'name')} value={data.name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Enter your email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(event) => handleChange(event, 'email')} value={data.email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Enter new password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" onChange={(event) => handleChange(event, 'password')} value={data.password}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Re enter password</Form.Label>
                  <Form.Control type="password" placeholder="Re Enter password" onChange={(event) => handleChange(event, 'confirmPassword')} value={data.confirmPassword}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Gender</Form.Label>
                  <div>
                    <Form.Check inline name="gender" label="Male" type={'radio'} id={'gender'} value={'male'}
                                onChange={(event) => handleChange(event, 'gender')} checked={data.gender == 'male'}/>
                    <Form.Check inline name="gender" label="Female" type={'radio'} id={'gender'} value={'female'}
                                onChange={(event) => handleChange(event, 'gender')} checked={data.gender == 'female'}/>
                  </div>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Write something about yourself</Form.Label>
                  <Form.Control as={'textarea'} rows="6" placeholder="Write here" onChange={(event) => handleChange(event, 'about')} value={data.about}/>
                </Form.Group>
              </Form>

              <Container>
                <p className="text-center">Already register! <a href="">Login</a></p>
              </Container>

              <Container className="text-center">
                <Button className="text-uppercase" variant="success">Register</Button>
                <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>
              </Container>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Base title="Electro Store / Signup"
          description="Fill the form correctly to register with us. By register with us you can use services that we provide.">
      {registerForm()}
    </Base>
  )
}

export default Register
