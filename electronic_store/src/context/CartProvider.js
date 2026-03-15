import { useContext, useEffect, useState } from "react"
import CartContext from "./CartContext"
import UserContext from "./UserContext";
import {addItemToCart, getCart, removeItemFromCart} from "../services/CartService";
import { toast } from "react-toastify";

const CartProvider = ({children}) => {
  const {isLogin, userData} = useContext(UserContext)
  const [cart, setCart] = useState(null);
  const [heading, setHeading] = useState("Initial heading");

  const loadUserCart = async (userId) => {
    try {
      const cart = await getCart(userId);
      setCart({...cart})
      console.log(cart)
    } 
    catch (error) {
      console.log(error)
      setCart({items: []})
    }
  }

  useEffect(() => {
    if(isLogin){
      loadUserCart(userData.user.userId)
    }
  }, [isLogin])

  const addItem = async (quantity, productId) => {
    try {
     const result = await addItemToCart(userData.user.userId, productId, quantity);
     setCart({...result});
    } 
    catch (error) {
      console.log(error)
      toast.error("Error in adding product in cart");
    }
  }

  const removeItem = async (itemId) => {
    try {
      const result = await removeItemFromCart(userData.user.userId, itemId)
    } 
    catch (error) {
      
    }
  }

  return (
    <CartContext.Provider value={{cart, setCart, addItem}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider
