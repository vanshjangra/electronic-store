import { useState } from "react"
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import { addProductImage, createProductWithoutCategory } from "../../services/product.service"

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagerPreview: undefined
  })

  const handleFileChange = (event) => {
    if(event.target.files[0].type === 'image/png' || event.target.files[0].type == 'image/jpeg'){
      const reader = new FileReader()

      reader.onload = (r) => {
        setProduct({
          ...product,
          imagerPreview: r.target.result,
          image: event.target.files[0]
        })
      }

      reader.readAsDataURL(event.target.files[0])
    }
    else{
      toast.error("Invalid File!")
        setProduct({
          ...product,
          image: undefined,
          imagerPreview: undefined
        })
    }
  }

  const submitAddProductForm = (event) => {
    event.preventDefault()

    if(product.title === undefined || product.title.trim() === ''){
      toast.error("Title is required!")
      return
    }

    if(product.description === undefined || product.description.trim() === ''){
      toast.error("Description is required!")
      return
    }

    if(product.price <= 0){
      toast.error("Invalid price!")
      return
    }

    if(product.discountedPrice <= 0 || product.discountedPrice >= product.price){
      toast.error("Invalid discounted price!")
      return
    }

    createProductWithoutCategory(product)
    .then(data => {
      console.log(data)

      addProductImage(product.image, data.productId)
      .then(data1 => {
        console.log(data1)
        toast.success("Image uploaded")
        setProduct({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagerPreview: undefined
      })
      })
      .catch(error => {
        console.log(error)
        toast.error("Error in uploading image")
      })

      toast.success("Product is created!")
    })
    .catch(error => {
      console.log(error)
      toast.error("Error in creating product! check product details")
    })
  }

  const formView = () => {
    return (
      <>
      <Card className="shadow-sm">

        {/* {JSON.stringify(product)} */}

        <Card.Body>
          <h5>Add Product here</h5>

          <Form onSubmit={submitAddProductForm}>
            <FormGroup className="mt-2">
              <Form.Label>Product title</Form.Label>
              <Form.Control type="text" placeholder="Enter here" value={product.title}
                            onChange={(event) => setProduct({
                              ...product,
                              title: event.target.value
                            })}/>
            </FormGroup>

            <Form.Group className="mt-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as={'textarea'} placeholder="Enter here" rows={6} value={product.description}
                            onChange={(event) => setProduct({
                              ...product,
                              description: event.target.value
                            })}/>
            </Form.Group>

            <Row>
              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={product.price}
                            onChange={(event) => setProduct({
                              ...product,
                              price: event.target.value
                            })}/>
             </FormGroup>
              </Col>

              <Col>
              <FormGroup className="mt-3">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={product.discountedPrice}
                            onChange={(event) => {

                              if(event.target.value > product.price){
                                toast.error("Invalid discount value!")

                                return
                              }

                              setProduct({
                              ...product,
                              discountedPrice: event.target.value
                            })
                            }}/>
              </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mt-3">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter here" value={product.quantity}
                            onChange={(event) => setProduct({
                              ...product,
                              quantity: event.target.value
                            })}/>
            </FormGroup>     

            <Row className="mt-3 px-1">
              <Col>
              <Form.Check type="switch" label={"Live"} checked={product.live}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              live: !product.live
                            })
                          }}/>
              </Col>

              <Col>
              <Form.Check type="switch" label={"Stock"} checked={product.stock}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              stock: !product.stock
                            })
                          }}/>
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Container hidden={!product.imagerPreview} className="text-center py-4 border border-2">
                <p className="text-muted">Image Preview</p>
                <img className="img-fluid" src={product.imagerPreview} alt=""
                     style={{
                      maxHeight: "250px"
                     }} />
              </Container>

              <Form.Label>Select product image</Form.Label>

            <InputGroup>
              <Form.Control type={'file'} onChange={(event) => handleFileChange(event)}/>
                <Button onClick={(event) => {
                  setProduct({
                    ...product,
                    imagerPreview: undefined,
                    image: undefined
                  })
                }} variant="outline-secondary">Clear</Button>
            </InputGroup>

            </Form.Group>

            <Container className="text-center mt-3">
              <Button type="submit" variant="success" size="sm">Add Product</Button>
              <Button variant="danger" className="ms-1" size="sm">Clear Data</Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
      </>
    )
  }

  return (
    <div>
      {
      formView()
      }
    </div>
  )
}

export default AddProduct
