import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProduct } from "../../services/product.service"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import ShowHtml from "../../components/ShowHtml"
import { getProductImageUrl } from "../../services/helper.service"
import defaultProductImage from "../../assets//default_product_image.jpg"

function ProductView() {
  const [product, setProduct] = useState(null)
  const {productId} = useParams()

  useEffect(() => {
    loadUser(productId)
  }, [])

  const loadUser = (productId) => {
    getProduct(productId).then(data => setProduct(data)).catch(error => console.log(error))
  }

  const productView = () => {
    return (
        <Container className="py-4">
            <Row>
                <Col>
                <Card className="mt-4 border border-0 shadow-sm">
                    <Card.Body>
                        <Container className="my-4">
                            <Row>
                                <Col>
                                <img src={getProductImageUrl(product.productId)} alt="" 
                                 style={{
                                    width: "500px"
                                 }}
                                 onError={(event) => {
                                    event.currentTarget.setAttribute('src', defaultProductImage)
                                 }}/>
                                </Col>

                                <Col>
                                <h3>{product.title}</h3>

                                <p className="text-muted">Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, iure!</span></p>

                                <Badge pill bg="info">
                                  {product.category?.title}
                                </Badge>
                                <Badge className="ms-2" pill bg={product.stock ? 'success' : 'danger'}>
                                  {product.stock ? "In Stock" : "Out Of Stock"}
                                     </Badge>

                                <Container className="text-center">
                                  <b><span className="h1 text-muted"><s>₹{product.price}</s></span></b>
                                  <b><span className="h2 ms-2">₹{product.discountedPrice}</span></b>
                                </Container>
                                </Col>
                            </Row>
                        </Container>

                        <div className="mt-5">
                            <ShowHtml htmlText={product.description}/>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>

            <Container className="d-grid mt-4">
                <Button variant="warning" size={'sm'}>Add to Cart</Button>
                <Button as={Link} to="/store" className="mt-2" variant="info" size={'sm'}>Go to Store</Button>
            </Container>
        </Container>
    )
  }

  return (
    product && productView()
  )
}

export default ProductView
