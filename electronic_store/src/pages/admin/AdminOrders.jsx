import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/OrderService"
import { ADMIN_ORDER_PAGE_SIZE } from "../../services/helper.service"
import { Card, Col, Container, Row } from "react-bootstrap"
import SingleOrderView from "../../components/SingleOrderView"

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined)

  const [fakeOrders, setFakeOrders] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ])

  useEffect(() => {
    getOrdersLocally();
  }, [])

  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders(0, ADMIN_ORDER_PAGE_SIZE, 'orderedDate', 'desc');
      console.log(data)
      setOrdersData(data) 
    }
    catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  const ordersView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="my-4 mx-2">All orders is here</h3>
          {
            ordersData.content.map(o => {
              return (
                <SingleOrderView order={o}/>
              )
            })
          }
        </Card.Body>
      </Card>
    )
  }

  return (
    <>
    <Container>
      <Row>
        <Col>
        {ordersData && ordersView()}
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default AdminOrders
