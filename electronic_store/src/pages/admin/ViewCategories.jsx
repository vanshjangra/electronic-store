import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {getCategories} from "../../services/CategoryService"
import { toast } from "react-toastify"

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCategories()
    .then(data => {
      console.log(data);
      setCategories(data)
    })
    .catch(error => {
      console.log(error)
      toast.error("Error in loading categories from server!")
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
     {
      categories.content.map((category) => {
        return (<CategoryView category={category} key={category.categoryId} />)
      })
     }
    </>
  )
}

export default ViewCategories
