import { Button, Card, Col, Container, Row } from "react-bootstrap"
import image from '../assets/unnamed.jpg'

const CategoryView = () => {
    const imageStyle = {
        width: "100px",
        height: "100px"
    }

  return (
    <div className="mb-3">
      <Card className="border-bottom shadow-sm">
        <Card.Body>
            <Row className="align-items-center">
                <Col md={2} className="text-center">
                    <img src={image} className="rounded-circle" style={imageStyle} alt="" />
                </Col>

                <Col md={8}>
                   <h5>Category Title</h5>

                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque repellat esse nulla aut quas amet quo exercitationem? Dicta, impedit unde.</p>
                </Col>

                <Col md={2}>
                  <Container className="d-grid">
                    <Button size="sm"  variant="danger">Delete</Button>
                    <Button className="mt-1" size="sm" variant="info">View</Button>
                    <Button className="mt-1" size="sm" variant="warning">Update</Button>
                  </Container>
                </Col>
            </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CategoryView
