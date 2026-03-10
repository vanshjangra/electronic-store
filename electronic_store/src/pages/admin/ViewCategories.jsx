import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {deleteCategory, getCategories} from "../../services/CategoryService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { Container, Spinner, Modal, Button } from "react-bootstrap"

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: []
  })

  const [selectedCategory, setSelectedCategory] = useState(undefined)

  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleView = (category) => {
    // alert("View button clicked")
    setSelectedCategory(category)
    handleShow()
  }

  const handleUpdate = (category) => {
    alert("Update button clicked")
  }

  const modalView = () => {
    return (
      <>
          <Modal animation={false} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCategory.title}</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                      <Container>
                        <img style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'contain'
                          }} src={selectedCategory.coverImage} alt="" />
                        </Container>

                        <div className="mt-3">
                            {selectedCategory.description}
                        </div>
                    </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
          </Modal>
      </>
    )
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
        return (
        <CategoryView viewCat={handleView} updateCat={handleUpdate} deleteCat = {deleteCategoryMain} 
                      category={category} key={category.categoryId} />
        )
      })
     }
    </>
      ) : <h5 className="text-center">No Categories in database</h5>)
    }

    {
      selectedCategory ? modalView() : ''
    }
  </div>)
}

export default ViewCategories
