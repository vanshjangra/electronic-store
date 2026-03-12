import { useEffect, useState } from "react"
import { Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import { getAllProducts } from "../../services/product.service"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import { Button, Modal } from "react-bootstrap"

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined)
  const [currentProduct, setCurrentProduct] = useState(undefined)

  const [show, setShow] = useState(false);
  
  const closeProductViewModal = () => {
    setShow(false);
  };

  const openProductViewModal = (event, product) => {
    console.log(product)
    setCurrentProduct(product)
    setShow(true);
  };

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
  }, [])

  const getProducts = (pageNumber = 0, pageSize = 10, sortBy = 'addedDate', sortDir = 'asc') => {
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
    .then(data => {
      console.log(data)
      setProducts({
        ...data
      })
    })
    .catch(error => {
      console.log(error)
      toast.error("Error in loading products")
    })
  }

  const updateProductList = (productId) => {
    const newArray = products.content.filter((p) => p.productId != productId)
    setProducts({
      ...products,
      content: newArray
    })
  }

  const viewProductModalView = () => {
    return (
    <>
      <Modal animation={false} size="lg" show={show} onHide={closeProductViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeProductViewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeProductViewModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
  }

  const productsView = () => {
    return (
      <Card className="shadow-sm">
          <Card.Body>
          <h5 className="mb-3">View Products</h5>

          <Form.Group className="mb-2">
            <Form.Label>Search Product</Form.Label>
            <Form.Control type="text" placeholder="Search here"/>
          </Form.Group>

          <Table className="text-center" bordered striped hover responsive size="sm">
          <thead>
            <tr>
              <th className="px-3 small">SN</th>
              <th className="px-3 small">Title</th>
              <th className="px-3 small">Quantity</th>
              <th className="px-3 small">Price</th>
              <th className="px-3 small">Discounted</th>
              <th className="px-3 small">Live</th>
              <th className="px-3 small">Stock</th>
              <th className="px-3 small">Category</th>
              <th className="px-3 small">Date</th>
              <th className="px-3 small">Action</th>
            </tr>
          </thead> 

          <tbody>
             {
              products.content.map((product, index) => (
                <SingleProductView key={index} index={index} product={product} updateProductList={updateProductList}
                                   openProductViewModal={openProductViewModal}/>
              ))
             }
          </tbody>
        </Table>

        <Container className="d-flex justify-content-end">
          <div>
          <Pagination size="md">
            <Pagination.First />
              <Pagination.Prev onClick={(event) => {
                if ((products.pageNumber - 1) < 0)
                 return
                 getProducts(products.pageNumber - 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                }}/>

                {
                  [...Array(products.totalPages)]
                  .map((ob, i) => i)
                  .map(item => {return products.pageNumber == item ? 
                  <Pagination.Item active key={item}>{item + 1}</Pagination.Item> : 
                  <Pagination.Item onClick={(event) => {
                    getProducts(item, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                  }} key={item}>{item + 1}
                  </Pagination.Item>})
                }

              <Pagination.Next onClick={(event) => {
                if (products.lastPage)
                  return
                  getProducts(products.pageNumber + 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
              }}/>
            <Pagination.Last />
          </Pagination>
          </div>
        </Container>

        </Card.Body>
      </Card>
    )
  }

  return (
    <>
     <Container fluid>
      <Row>
        <Col>
         {
          products ? productsView() : ""
         }
        </Col>
      </Row>
     </Container>

     {
      viewProductModalView()
     }
    </>
  )
}

export default ViewProducts
