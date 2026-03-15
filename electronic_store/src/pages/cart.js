import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart(){
    const {cart, heading, setCart, setHeading} =  useContext(CartContext)
    return (
      <div className="p-5">
        
      </div>
    )
}

export default Cart;