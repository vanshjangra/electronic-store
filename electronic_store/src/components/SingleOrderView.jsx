import { Button, Card, Col, Container, Row, Table } from "react-bootstrap"

const SingleOrderView = () => {
  return (
    <Card className="border border-0 shadow-sm mb-5">
        <Card.Body>
            <Row>
                <Col>
                <b>Order Id: </b>sdwvetrtgercfwtv
                </Col>

                <Col>
                <b>Billing Name: </b>Vansh Jangra
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                <Table bordered striped>
                 <tbody>
                    <tr>
                        <td>Billing Phone</td>
                        <td>79415645615</td>
                    </tr>

                    <tr>
                        <td>Items</td>
                        <td>10</td>
                    </tr>

                    <tr>
                        <td>Payment Status</td>
                        <td>PAID</td>
                    </tr>

                    <tr>
                        <td>Order Status</td>
                        <td>PENDING</td>
                    </tr>

                    <tr>
                        <td>Ordered Date</td>
                        <td>13 March 2026</td>
                    </tr>
                </tbody>   
                </Table>
                </Col>
            </Row>

            <Container className="text-center">
                <Button size="sm" variant="info">View Order Details</Button>
            </Container>
        </Card.Body>
    </Card>
  )
}

export default SingleOrderView
