import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Button } from "react-bootstrap";

function Cart(){
    const {cart, heading, setCart, setHeading} =  useContext(CartContext)
    return (
      <div className="p-5">
        <h1>{heading}</h1>
        <h1>Showing cart items</h1>

        {
            cart.map((item) => (
            <h1>{item}</h1>
            ))
        }

        <Button onClick={(event) => {
            setCart([...cart, Math.round(Math.random()) * 100]);
        }}>
        Add item to cart
        </Button>
      </div>
    )
}

export default Cart;