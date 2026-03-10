import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap"

const AddProduct = () => {
  const formView = () => {
    return (
      <>
      <Card className="shadow-sm">
        <Card.Body>
          <h5>Add Product here</h5>

          <Form>
            <FormGroup className="mt-2">
              <Form.Label>Product title</Form.Label>
              <Form.Control type="text" placeholder="Enter here"/>
            </FormGroup>

            <Form.Group className="mt-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as={'textarea'} placeholder="Enter here" rows={6}/>
            </Form.Group>

            <Row>
              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here"/>
             </FormGroup>
              </Col>

              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here"/>
              </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mt-3">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter here"/>
            </FormGroup>     

            <Row className="mt-3 px-1">
              <Col>
              <Form.Check type="switch" label={"Live"}/>
              </Col>

              <Col>
              <Form.Check type="switch" label={"Stock"}/>
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Select product image</Form.Label>
              <Form.Control type={'file'}/>
            </Form.Group>

            <Container className="text-center mt-3">
              <Button variant="success" size="sm">Add Product</Button>
              <Button variant="danger" className="ms-1" size="sm">Clear Data</Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
      </>
    )
  }

  return (
    <div>
      {
      formView()
      }
    </div>
  )
}

export default AddProduct
