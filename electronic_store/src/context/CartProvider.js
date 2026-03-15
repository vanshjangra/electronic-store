import { useEffect, useState } from "react"
import CartContext from "./CartContext"

const CartProvider = ({children}) => {
  const [cart, setCart] = useState([2, 24, 35, 46]);
  const [heading, setHeading] = useState("Initial heading");

  useEffect(() => {
    setHeading("Cart Items " + cart.length)
  }, [cart])

  return (
    <CartContext.Provider value={{cart, heading, setCart, setHeading}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider
