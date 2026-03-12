import { useEffect, useRef, useState } from "react"
import { Card, Col, Container, Form, Pagination, Row, Table, FormGroup, InputGroup } from "react-bootstrap"
import { getAllProducts, updateProduct } from "../../services/product.service"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { getProductImageUrl, PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import { Button, Modal } from "react-bootstrap"
import defaultImage from '../../assets/default_profile.jpg'
import ShowHtml from "../../components/ShowHtml"
import {Editor} from "@tinymce/tinymce-react"
import { getCategories } from "../../services/CategoryService"

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined)
  const [currentProduct, setCurrentProduct] = useState(undefined)

  const editorRef = useRef()

  const [categories, setCategories] = useState(undefined)

  useEffect(() => {
    getCategories(0, 1000)
    .then(data => {
      setCategories({...data})
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const [show, setShow] = useState(false);
  
  const closeProductViewModal = () => {
    setShow(false);
  };

  const openProductViewModal = (event, product) => {
    console.log(product)
    setCurrentProduct(product)
    setShow(true);
  };

  const [showEditModal, setShowEditModal] = useState(false)

  const closeEditProductModel = (event, product) => {
    setShowEditModal(false)
  }

  const openEditProductModel = (event, product) => {
    setCurrentProduct(product)
    setShowEditModal(true)
  }

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

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault()
    console.log(currentProduct)
    if(currentProduct.title === ''){
      toast.error("Title required")
      return
    }

    updateProduct(currentProduct, currentProduct.productId)
    .then(data => {
      console.log(data)
      const newArray = products.content.map(p => {
        if(p.productId === currentProduct.productId)
          return data

        return p
      })

      setProducts({
        ...products,
        content: newArray
      })
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
    return currentProduct && (
    <>
      <Modal animation={false} size={"xl"} show={show} onHide={closeProductViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Card className="shadow-sm">
        <Card.Body>
        <Container className="text-center py-3">
          <img src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId) : defaultImage} alt="" style={{
            height: '300px'
          }} />
        </Container>

        <Table striped bordered responsive className="text-center">
          <thead>
            <tr>
              <th>Info</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Product Id</td>
              <td className="fw-bold">{currentProduct.productId}</td>
            </tr>

            <tr>
              <td>Quantity</td>
              <td className="fw-bold">{currentProduct.quantity}</td>
            </tr>

            <tr>
              <td>Price</td>
              <td className="fw-bold">{currentProduct.price} ₹</td>
            </tr>

            <tr>
              <td>Discounted Price</td>
              <td className="fw-bold">{currentProduct.discountedPrice} ₹</td>
            </tr>

            <tr className={currentProduct.live ? '' : 'table-danger'}>
              <td>Live</td>
              <td className="fw-bold">{currentProduct.live ? 'True' : 'False'}</td>
            </tr>

            <tr className={currentProduct.stock ? '' : 'table-danger'}>
              <td>Stock</td>
              <td className="fw-bold">{currentProduct.stock ? 'In Stock' : 'Not In Stock'}</td>
            </tr>

            <tr>
              <td>Catgory</td>
              <td className="fw-bold">{currentProduct.category?.title}</td>
            </tr>
          </tbody>
        </Table>

        <div className="p-3 border border-1">
          <ShowHtml htmlText={currentProduct.description}/>
        </div>
        </Card.Body>
        </Card>
        
        </Modal.Body>
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

  const editProductModalView = () => {
    return currentProduct && (
    <>
      <Modal animation={false} size="xl" show={showEditModal} onHide={closeEditProductModel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {/* {JSON.stringify(currentProduct)} */}

        <Form onSubmit={handleUpdateFormSubmit}>
            <FormGroup className="mt-2">
              <Form.Label>Product title</Form.Label>
              <Form.Control type="text" placeholder="Enter here" value={currentProduct.title}
                            onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              title: event.target.value
                            })}/>
            </FormGroup>

            <Form.Group className="mt-3">
              <Form.Label>Product Description</Form.Label>
              {/* <Form.Control as={'textarea'} placeholder="Enter here" rows={6} value={product.description}
                            onChange={(event) => setProduct({
                              ...product,
                              description: event.target.value
                            })}/> */}

              <Editor apiKey="" onInit={(evt, editor) => editorRef.current = editor}
                      init={{
                            height: 380,
                            menubar: true,
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }} value={currentProduct.description}
                               onEditorChange={(event) => setCurrentProduct({
                                ...currentProduct,
                                description: editorRef.current.getContent()
                               })}/>
            </Form.Group>

            <Row>
              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={currentProduct.price}
                            onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              price: event.target.value
                            })}/>
             </FormGroup>
              </Col>

              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={currentProduct.discountedPrice}
                            onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              discountedPrice: event.target.value
                            })}/>
              </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mt-3">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={currentProduct.quantity}
                            onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              quantity: event.target.value
                            })}/>
            </FormGroup>     

            <Row className="mt-3 px-1">
              <Col>
              <Form.Check type="switch" label={"Live"} checked={currentProduct.live}
                          onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              live: !currentProduct.live
                            })}/>
              </Col>

              <Col>
              <Form.Check type="switch" label={"Stock"} checked={currentProduct.stock}
                          onChange={(event) => setCurrentProduct({
                              ...currentProduct,
                              stock: !currentProduct.stock
                            })}/>
              </Col>
            </Row>

            <Form.Group className="my-5">
              <Container className="text-center py-4 border border-2">
                <p className="text-muted">Image Preview</p>
                <img className="img-fluid" alt=""
                     style={{
                      maxHeight: "250px"
                     }} src={getProductImageUrl(currentProduct.productId)}/>
              </Container>

              <Form.Label>Select product image</Form.Label>

            <InputGroup>
              <Form.Control type={'file'}/>
                <Button variant="outline-secondary">Clear</Button>
            </InputGroup>

            </Form.Group>

            {/* {JSON.stringify(selectedCategoryId)} */}

            <Form.Group className="mt-3">
              <Form.Label>Select Category</Form.Label>
              <Form.Select>
                <option value="none">None</option>

                {
                  categories && categories.content.map(cat => {
                    return (
                      <option selected={cat.categoryId == currentProduct.category?.categoryId} 
                              value={cat.categoryId} key={cat.categoryId}>{cat.title}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>

            <Container className="text-center mt-3">
              <Button type="submit" variant="success" size="sm">Save Details</Button>
            </Container>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditProductModel}>
            Close
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
                                   openProductViewModal={openProductViewModal} openEditProductModel={openEditProductModel}/>
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

     {
      editProductModalView()
     }
    </>
  )
}

export default ViewProducts
