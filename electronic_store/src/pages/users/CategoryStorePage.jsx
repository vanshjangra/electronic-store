import { useParams } from "react-router-dom"
import { getProductsOfCategories } from "../../services/product.service"
import { useEffect, useState } from "react"
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service"

const CategoryStorePage = () => {
  const {categoryId, categoryTitle} = useParams()
  const [products, setProducts] = useState(null)

  useEffect(() => {
    loadProductsOfCategories(0, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
  }, [])

  const loadProductsOfCategories = (pageNumber, pageSize, sortBy, sortDir) => {
    getProductsOfCategories(categoryId, pageNumber, pageSize, sortBy, sortDir)
    .then(data => {
        console.log(data)
        setProducts({...data})
    })
    .catch(error => {
        console.log(error)
    })
  }

  return (
    <div>CategoryStorePage</div>
  )
}

export default CategoryStorePage
