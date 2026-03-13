import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/OrderService"
import { ADMIN_ORDER_PAGE_SIZE } from "../../services/helper.service"

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined)

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

  return (
    <>
    <p>Admin orders</p>
    {JSON.stringify(ordersData)}
    </>
  )
}

export default AdminOrders
