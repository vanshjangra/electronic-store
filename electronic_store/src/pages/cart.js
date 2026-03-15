import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";

function Cart(){
    const {cart, setCart, addItem, removeItem, clearCart} =  useContext(CartContext)

    const cartView = () => {
      return (
   <>
      <Card className="mt-3 shadow-sm">
        <Card.Body>
          <Row className="px-5">
            <Col>
            <h3>Cart</h3>
            </Col>

            <Col className="text-end">
            <h3>{cart.items.length} Items</h3>
            </Col>
          </Row>

          <Row className="px-5 mt-3">
            <Col>
            {
              cart.items.map(item => (
                <SingleCartItemView item={item}/>
              ))
            }
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
      ) 
    }

    return (
      <div className="">
        <Container>
          <Row>
            <Col>
            {cart && cartView()}
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Cart;