import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {deleteCategory, getCategories} from "../../services/CategoryService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { Container, Spinner } from "react-bootstrap"

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

  const deleteCategoryMain = (categoryId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if(result.isConfirmed){
            deleteCategory(categoryId)
            .then(data => {
              Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
              )

              const newArray = categories.content.filter((c) => {
                return c.categoryId != categoryId
              })

              setCategories({
                ...categories,
                content: newArray
              })
            })
            .catch(error => {
              console.log(error)
              toast.error("Error in deleting category")
            })
          }
        })
  }

  return (<div>
    <Container className="text-center p-3" hidden={!loading}>
      <Spinner/>
      <div>
        <h3>Loading...</h3>
      </div>
    </Container>

    {
      (categories.content.length > 0 ? (
    <>
     {
      categories.content.map((category) => {
        return (<CategoryView deleteCat = {deleteCategoryMain} category={category} key={category.categoryId} />)
      })
     }
    </>
      ) : <h5 className="text-center">No Categories in database</h5>)
    }
  </div>)
}

export default ViewCategories
