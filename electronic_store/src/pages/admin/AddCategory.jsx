import { Button, Card, Container, Form, FormGroup } from "react-bootstrap"

const AddCategory = () => {
  return (
    <>
    <Container fluid>
      <Card className="border border-0 shadow-sm">
        <Card.Body>
          <h5>Add Category Here</h5>

          <Form>
            <FormGroup className="mt-3">
              <Form.Label>Category Title</Form.Label>
              <Form.Control type="text" placeholder="Enter here"/>
            </FormGroup>

            <FormGroup className="mt-3">
              <Form.Label>Category Description</Form.Label>
              <Form.Control rows={6} as={'textarea'} placeholder={'Enter here'}/>
            </FormGroup>

            <FormGroup className="mt-3">
              <Form.Label>Category Cover Image Url</Form.Label>
              <Form.Control type="text" placeholder={'Enter here'}/>
            </FormGroup>

            <Container className="text-center mt-2">
              <Button variant="success" size="sm">Add Category</Button>
              <Button variant="danger" className="ms-2" size="sm">Clear</Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
}

export default AddCategory
