import { Button, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"

const ViewProducts = () => {
  return (
    <>
     <Container fluid>
      <Row>
        <Col>
        <Card className="shadow-sm">
          <Card.Body>
          <h5 className="mb-3">View Products</h5>

          <Form.Group className="mb-2">
            <Form.Label>Search Product</Form.Label>
            <Form.Control type="text" placeholder="Search here"/>
          </Form.Group>

          <Table className="text-center" bordered striped hover responsive size="sm">
          <thead>
            <tr>
              <th>#SN</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discounted Price</th>
              <th>Live</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Added Date</th>
              <th>Action</th>
            </tr>
          </thead> 

          <tbody>
            <tr>
               <td>#1</td>
               <td>Iphone 13 Pro Max</td>
               <td>13</td>
               <td>52000</td>
               <td>50000</td>
               <td>True</td>
               <td>True</td>
               <td>Mobile Phones</td>
               <td>31 June</td>

               <td>
                <Button variant="danger" size="sm">Delete</Button>
                <Button className="ms-2" variant="warning" size="sm">View</Button>
                <Button className="ms-2" variant="dark" size="sm">Update</Button>
               </td>
            </tr>
          </tbody>
        </Table>

        <Container className="d-flex justify-content-end">
          <div>
          <Pagination>
            <Pagination.Prev></Pagination.Prev>
            <Pagination.Item>2</Pagination.Item>
            <Pagination.Item>3</Pagination.Item>
            <Pagination.Next></Pagination.Next>
          </Pagination>
          </div>
        </Container>

        </Card.Body>
        </Card>
        </Col>
      </Row>
     </Container>
    </>
  )
}

export default ViewProducts
